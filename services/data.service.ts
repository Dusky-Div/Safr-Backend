import PasswordDetails from "../models/PasswordDetails.model";
import CreditCardDetails from "../models/CreditCardDetails.model";
import ApiKeyDetails from "../models/ApiKeyDetails.model";
import BankAccountDetails from "../models/BankAccountDetails.model";
import SecureNoteDetails from "../models/SecureNoteDetails.model";

export const fetchAllUserData = async (firebaseUID: string) => {
  const [passwords, creditCards, apiKeys, bankAccounts, notes] =
    await Promise.all([
      PasswordDetails.find({ firebaseUID }),
      CreditCardDetails.find({ firebaseUID }),
      ApiKeyDetails.find({ firebaseUID }),
      BankAccountDetails.find({ firebaseUID }),
      SecureNoteDetails.find({ firebaseUID }),
    ]);

  const mergedData = [
    ...passwords.map((item) => item.toObject()),
    ...creditCards.map((item) => item.toObject()),
    ...apiKeys.map((item) => item.toObject()),
    ...bankAccounts.map((item) => item.toObject()),
    ...notes.map((item) => item.toObject()),
  ];

  return mergedData;
};
