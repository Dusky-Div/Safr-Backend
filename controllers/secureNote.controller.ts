import { Request, Response } from "express";
import { handleSaveSecureNote } from "../services/secureNote.service";

export const saveSecureNote = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const result = await handleSaveSecureNote(req.body);
    console.log("✅ Secure Note saved successfully");

    return res.status(201).json({
      message: "Secure Note saved successfully!",
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
