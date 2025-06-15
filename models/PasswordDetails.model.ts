import mongoose from "mongoose";

const PasswordDetailsSchema = new mongoose.Schema(
  {
    firebaseUID: { type: String, index: true, required: true },
    entryType: { type: String, required: true },
    displayData: {
      websiteName: { type: String },
      websiteURL: { type: String },
      username: { type: String },
    },
    data: {
      encryptedIv: { type: String, required: true },
      encryptedCiphertext: { type: String, required: true },
      salt: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const PasswordDetails = mongoose.model(
  "PasswordDetails",
  PasswordDetailsSchema,
  "PasswordDetails"
);
export default PasswordDetails;
