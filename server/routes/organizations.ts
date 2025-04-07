import { Router } from "express";
import {
  getOrganizations,
  getOrganizationById,
  getOrganizationDetails,
} from "../controllers/organizationsController";

const router = Router();

router.get("/", getOrganizations);
router.get("/:id", getOrganizationById);
router.get("/:id/details", getOrganizationDetails);

export default router;
