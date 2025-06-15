import { Request, Response } from "express";
import { handleSaveApiKey } from "../services/apiKey.service";

export const saveApiKey = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await handleSaveApiKey(req.body);
    console.log("✅ Api Key saved successfully");

    return res.status(201).json({
      message: "Api Key saved successfully!",
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
