import mongoose from "mongoose";

const ApiKeyDetailsSchema = new mongoose.Schema(
  {
    firebaseUID: { type: String, index: true, required: true },
    entryType: { type: String, required: true },
    displayData: {
      serviceName: { type: String },
    },
    data: {
      encryptedIv: { type: String, required: true },
      encryptedCiphertext: { type: String, required: true },
      salt: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const ApiKeyDetails = mongoose.model(
  "ApiKeyDetails",
  ApiKeyDetailsSchema,
  "ApiKeyDetails"
);
export default ApiKeyDetails;
