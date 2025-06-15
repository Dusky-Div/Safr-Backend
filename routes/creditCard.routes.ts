import { Router } from "express";
import { saveCreditCard } from "../controllers/creditCard.controller";

const router = Router();

router.post("/save-creditCard", saveCreditCard);

export default router;
