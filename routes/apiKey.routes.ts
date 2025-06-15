import { Router } from "express";
import { saveApiKey } from "../controllers/apiKey.controller";

const router = Router();

router.post("/save-apiKey", saveApiKey);

export default router;
