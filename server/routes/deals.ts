import { Router } from "express";
import {
  getDeals,
  getDealById,
  getDealsByAccountId,
} from "../controllers/dealsController";

const router = Router();

router.get("/", getDeals);
router.get("/:id", getDealById);
router.get("/account/:id", getDealsByAccountId);

export default router;
