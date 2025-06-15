import PasswordDetails from "../models/PasswordDetails.model";
import { deriveKey, encryptObject } from "../utils/PasswordHandler";

interface PasswordRequestBody {
  firebaseUID: string;
  entryType: "password";
  displayData: {
    websiteName: string;
    websiteURL: string;
    username: string;
  };
  data: {
    password: string;
  };
}

export const handleSavePassword = async (body: PasswordRequestBody) => {
  const { firebaseUID, entryType, displayData, data: PasswordData } = body;

  if (!firebaseUID) {
    throw new Error("Firebase UID is required.");
  }

  // TODO: Use env variables in production
  const masterPassword = "mySuperSecretMasterPassword";
  const salt = "uniqueUserSalt123";

  console.log("🔐 Deriving key...");
  const aesKey = await deriveKey(masterPassword, salt);
  console.log("🔏 Encrypting data...");
  const encryptedResult = await encryptObject(aesKey, PasswordData);

  const newPasswordDetails = new PasswordDetails({
    firebaseUID,
    entryType,
    displayData: {
      websiteName: displayData.websiteName,
      websiteURL: displayData.websiteURL,
      username: displayData.username,
    },
    data: {
      encryptedIv: encryptedResult.iv,
      encryptedCiphertext: encryptedResult.ciphertext,
      salt,
    },
  });
  const saved = await newPasswordDetails.save();

  return saved;
};
