import mongoose, { Schema } from "mongoose";

const CreditCardDetailsSchema = new Schema(
  {
    firebaseUID: { type: String, index: true, required: true },
    type: { type: String, required: true },

    displayData: {
      cardName: { type: String, required: true },
      cardHolderName: { type: String, required: true },
    },

    data: {
      encryptedIv: { type: String, required: true },
      encryptedCiphertext: { type: String, required: true },
      salt: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const CreditCardDetails = mongoose.model(
  "CreditCardDetails",
  CreditCardDetailsSchema,
  "CreditCardDetails"
);
export default CreditCardDetails;
