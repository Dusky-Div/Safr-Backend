import { Router } from "express";
import { getAllData } from "../controllers/data.controller";

const router = Router();

router.get("/vault", getAllData);

export default router;
