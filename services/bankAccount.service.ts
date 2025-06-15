import BankAccountDetails from "../models/BankAccountDetails.model";
import { deriveKey, encryptObject } from "../utils/PasswordHandler";

interface BankAccountRequestBody {
  firebaseUID: string;
  entryType: "bankAccount";
  displayData: {
    bankName: string;
    accountHolderName: string;
  };
  data: {
    accountNumber: string;
    ifscCode: string;
    branch: string;
  };
}

export const handleSaveBankAccount = async (body: BankAccountRequestBody) => {
  const { firebaseUID, entryType, displayData, data: BankAccountData } = body;

  if (!firebaseUID) {
    throw new Error("Firebase UID is required.");
  }

  // TODO: Use env variables in production
  const masterPassword = "mySuperSecretMasterPassword";
  const salt = "uniqueUserSalt123";

  console.log("🔐 Deriving key...");
  const aesKey = await deriveKey(masterPassword, salt);
  console.log("🔏 Encrypting data...");
  const encryptedResult = await encryptObject(aesKey, BankAccountData);

  const newBankAccountDetails = new BankAccountDetails({
    firebaseUID,
    entryType,
    displayData: {
      bankName: displayData.bankName,
      accountHolderName: displayData.accountHolderName,
    },
    data: {
      encryptedIv: encryptedResult.iv,
      encryptedCiphertext: encryptedResult.ciphertext,
      salt,
    },
  });
  const saved = await newBankAccountDetails.save();

  return saved;
};
