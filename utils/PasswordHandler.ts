import * as nodeCrypto from "crypto";

const crypto = nodeCrypto.webcrypto;

async function strToBuffer(str: string): Promise<Uint8Array> {
  return new TextEncoder().encode(str);
}

function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  return Buffer.from(buffer).toString("base64");
}

function base64ToBuffer(base64: string): Uint8Array {
  return Uint8Array.from(Buffer.from(base64, "base64"));
}

async function deriveKey(
  masterPassword: string,
  salt: string
): Promise<CryptoKey> {
  const mpBuffer = await strToBuffer(masterPassword);
  const saltBuffer = await strToBuffer(salt);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    mpBuffer,
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

interface EncryptedData {
  iv: string;
  ciphertext: string;
}

async function encryptObject<T extends object>(
  key: CryptoKey,
  jsonData: T
): Promise<EncryptedData> {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV
  const plaintext = await strToBuffer(JSON.stringify(jsonData));
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    plaintext
  );

  return {
    iv: bufferToBase64(iv),
    ciphertext: bufferToBase64(ciphertext),
  };
}
async function decryptObject<T extends object>(
  key: CryptoKey,
  ivBase64: string,
  ciphertextBase64: string
): Promise<T> {
  const iv = base64ToBuffer(ivBase64);
  const ciphertext = base64ToBuffer(ciphertextBase64);

  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    ciphertext
  );

  const jsonString = new TextDecoder().decode(decryptedBuffer);
  return JSON.parse(jsonString) as T;
}

export {
  deriveKey,
  encryptObject,
  decryptObject,
  type EncryptedData, // Exporting interface for types
};
