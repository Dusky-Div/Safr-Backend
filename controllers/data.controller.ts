import { Request, Response, RequestHandler } from "express";
import { fetchAllUserData } from "../services/data.service";

export const getAllData: RequestHandler = async (req, res) => {
  try {
    const { firebaseUID } = req.query;

    if (!firebaseUID || typeof firebaseUID !== "string") {
      res.status(400).json({ message: "firebaseUID is required" });
      return;
    }

    const data = await fetchAllUserData(firebaseUID);
    res.status(200).json({ data });
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
