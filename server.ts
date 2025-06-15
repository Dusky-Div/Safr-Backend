import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import users from "./routes/users";
import connectDB from "./db/db";
import CreditCard from "./routes/creditCard.routes";
import Password from "./routes/password.routes";
import BankAccount from "./routes/bankAccount.routes";
import ApiKey from "./routes/apiKey.routes";
import SecureNote from "./routes/secureNote.routes";
import Data from "./routes/data.routes";

const app = express();
const PORT = process.env.PORT;

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

//Routes
app.use("/", users);
app.use("/api", Data);
app.use("/api", CreditCard);
app.use("/api", Password);
app.use("/api", BankAccount);
app.use("/api", ApiKey);
app.use("/api", SecureNote);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT || 5090, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.warn("Error on startServer: ", error);
    process.exit(1);
  }
};

startServer();
