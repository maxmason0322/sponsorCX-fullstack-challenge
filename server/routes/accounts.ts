import { Router } from "express";
import {
  getAccounts,
  getAccountById,
  getAccountsByOrganizationId,
} from "../controllers/accountsController";

const router = Router();

router.get("/", getAccounts);
router.get("/:id", getAccountById);
router.get("/organization/:id", getAccountsByOrganizationId);

export default router;
