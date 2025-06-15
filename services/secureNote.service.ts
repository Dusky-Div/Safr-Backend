import SecureNoteDetails from "../models/SecureNoteDetails.model";
import { deriveKey, encryptObject } from "../utils/PasswordHandler";

interface SecureNoteRequestBody {
  firebaseUID: string;
  entryType: "secureNote";
  displayData: {
    title: string;
  };
  data: {
    noteContent: string;
  };
}

export const handleSaveSecureNote = async (body: SecureNoteRequestBody) => {
  const { firebaseUID, entryType, displayData, data: SecureNoteData } = body;

  if (!firebaseUID) {
    throw new Error("Firebase UID is required.");
  }

  // TODO: Use env variables in production
  const masterPassword = "mySuperSecretMasterPassword";
  const salt = "uniqueUserSalt123";

  console.log("🔐 Deriving key...");
  const aesKey = await deriveKey(masterPassword, salt);
  console.log("🔏 Encrypting data...");
  const encryptedResult = await encryptObject(aesKey, SecureNoteData);

  const newSecureNoteDetails = new SecureNoteDetails({
    firebaseUID,
    entryType,
    displayData: {
      title: displayData.title,
    },
    data: {
      encryptedIv: encryptedResult.iv,
      encryptedCiphertext: encryptedResult.ciphertext,
      salt,
    },
  });
  const saved = await newSecureNoteDetails.save();

  return saved;
};
