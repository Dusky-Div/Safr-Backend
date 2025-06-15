import ApiKeyDetails from "../models/ApiKeyDetails.model";
import { deriveKey, encryptObject } from "../utils/PasswordHandler";

interface ApiKeyRequestBody {
  firebaseUID: string;
  entryType: "apiKey";
  displayData: {
    serviceName: string;
  };
  data: {
    apiKey: string;
  };
}

export const handleSaveApiKey = async (body: ApiKeyRequestBody) => {
  const { firebaseUID, entryType, displayData, data: ApiKeyData } = body;

  if (!firebaseUID) {
    throw new Error("Firebase UID is required.");
  }

  // TODO: Use env variables in production
  const masterPassword = "mySuperSecretMasterPassword";
  const salt = "uniqueUserSalt123";

  console.log("🔐 Deriving key...");
  const aesKey = await deriveKey(masterPassword, salt);
  console.log("🔏 Encrypting data...");
  const encryptedResult = await encryptObject(aesKey, ApiKeyData);

  const newApiKeyDetails = new ApiKeyDetails({
    firebaseUID,
    entryType,
    displayData: {
      serviceName: displayData.serviceName,
    },
    data: {
      encryptedIv: encryptedResult.iv,
      encryptedCiphertext: encryptedResult.ciphertext,
      salt,
    },
  });
  const saved = await newApiKeyDetails.save();

  return saved;
};
