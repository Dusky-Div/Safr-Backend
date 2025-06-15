import { Request, Response } from "express";
import { handleSaveBankAccount } from "../services/bankAccount.service";

export const saveBankAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const result = await handleSaveBankAccount(req.body);
    console.log("✅ Bank Account saved successfully");

    return res.status(201).json({
      message: "Bank Account saved successfully!",
      data: result,
    });
  } catch (error: any) {
    console.error("❌ Error in controller:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message || "Unknown error",
    });
  }
};
