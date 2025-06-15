import { Request, Response } from "express";
import { handleSaveCreditCard } from "../services/creditCard.service";

export const saveCreditCard = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const result = await handleSaveCreditCard(req.body);
    return res
      .status(201)
      .json({ message: "Credit card saved successfully!", data: result });
  } catch (error: any) {
    console.error("Error in controller:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message || "Unknown error",
    });
  }
};
