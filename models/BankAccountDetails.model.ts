import mongoose from "mongoose";

const BankAccountDetailsSchema = new mongoose.Schema(
  {
    firebaseUID: { type: String, index: true, required: true },
    entryType: { type: String, required: true },
    displayData: {
      bankName: { type: String },
      accountHolderName: { type: String },
    },
    data: {
      encryptedIv: { type: String, required: true },
      encryptedCiphertext: { type: String, required: true },
      salt: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const BankAccountDetails = mongoose.model(
  "BankAccountDetails",
  BankAccountDetailsSchema,
  "BankAccountDetails"
);
export default BankAccountDetails;
