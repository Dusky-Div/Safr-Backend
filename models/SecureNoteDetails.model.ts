import mongoose from "mongoose";

const SecureNoteDetailsSchema = new mongoose.Schema(
  {
    firebaseUID: { type: String, index: true, required: true },
    entryType: { type: String, required: true },
    displayData: {
      title: { type: String },
    },
    data: {
      encryptedIv: { type: String, required: true },
      encryptedCiphertext: { type: String, required: true },
      salt: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const SecureNoteDetails = mongoose.model(
  "SecureNoteDetails",
  SecureNoteDetailsSchema,
  "SecureNoteDetails"
);
export default SecureNoteDetails;
