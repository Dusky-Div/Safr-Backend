import CreditCardDetails from "../models/CreditCardDetails.model";
import { deriveKey, encryptObject } from "../utils/PasswordHandler";

interface CreditCardRequestBody {
  firebaseUID: string;
  entryType: "creditCard";
  displayData: {
    cardName: string;
    cardHolderName: string;
  };
  data: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

export const handleSaveCreditCard = async (body: CreditCardRequestBody) => {
  const { firebaseUID, entryType, displayData, data: creditCardData } = body;

  if (!firebaseUID) {
    throw new Error("Firebase UID is required.");
  }

  const { cardName, cardHolderName } = displayData;

  // TODO: Replace with process.env vars
  const masterPassword = "mySuperSecretMasterPassword";
  const salt = "uniqueUserSalt123";

  const aesKey = await deriveKey(masterPassword, salt);
  const encryptedResult = await encryptObject(aesKey, creditCardData);

  const newCreditCardDetails = new CreditCardDetails({
    firebaseUID,
    type: entryType,
    displayData: {
      cardName,
      cardHolderName,
    },
    data: {
      encryptedIv: encryptedResult.iv,
      encryptedCiphertext: encryptedResult.ciphertext,
      salt,
    },
  });

  return await newCreditCardDetails.save();
};
