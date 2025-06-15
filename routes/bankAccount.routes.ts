import { Router } from "express";
import { saveBankAccount } from "../controllers/bankAccount.controller";

const router = Router();

router.post("/save-bankAccount", saveBankAccount);

export default router;
