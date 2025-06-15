import { Router } from "express";
import User from "../models/Users.model";

const router = Router();

//Fetching user details using firebaseUID
router.get("/api/user/:firebaseUID", async (req: any, res: any) => {
  try {
    const { firebaseUID } = req.params;
    const user = await User.findOne({ firebaseUID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Saving user data in mongoDB
router.post("/signup", async (req: any, res: any) => {
  try {
    const { firebaseUID, firstName, lastName, email } = req.body;

    console.log("Received data:", { firebaseUID, firstName, lastName, email });

    // Check if user already exists
    const existingUser = await User.findOne({ firebaseUID });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ firebaseUID, firstName, lastName, email });

    console.log("New user before saving:", newUser);

    await newUser.save();
    console.log("User saved:", newUser);

    console.log("User saved successfully!");

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in /signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
