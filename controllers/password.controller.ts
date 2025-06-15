import { Request, Response } from "express";
import { handleSavePassword } from "../services/password.service";

export const savePassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const result = await handleSavePassword(req.body);
    console.log("✅ Password saved successfully");

    return res.status(201).json({
      message: "Password saved successfully!",
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
