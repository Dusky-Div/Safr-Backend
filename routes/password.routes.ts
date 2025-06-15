import { Router } from "express";
import { savePassword } from "../controllers/password.controller";

const router = Router();

router.post("/save-password", savePassword);

export default router;
