import { Router } from "express";
import { saveSecureNote } from "../controllers/secureNote.controller";

const router = Router();

router.post("/save-secureNote", saveSecureNote);

export default router;
