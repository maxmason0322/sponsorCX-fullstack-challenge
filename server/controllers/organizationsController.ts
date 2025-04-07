import { Request, Response } from "express";
import {
  fetchOrganizations,
  fetchOrganizationById,
  fetchOrganizationDetails,
} from "../services/organizationsService";

// If I had more time, I would abstract out the error handling into a utility function.

// This controller file interacts with the organizations service layer and is
// responsible for handling the HTTP requests.
export function getOrganizations(req: Request, res: Response) {
  try {
    const organizations = fetchOrganizations();
    res.status(200).json(organizations);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Failed to fetch organizations" });
    }
  }
}

export function getOrganizationById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const organization = fetchOrganizationById(Number(id));
    if (!organization) {
      res.status(404).json({ error: "Organization not found" });
    } else {
      res.status(200).json(organization);
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Failed to fetch organization" });
    }
  }
}

export function getOrganizationDetails(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const organizationDetails = fetchOrganizationDetails(Number(id));
    if (!organizationDetails) {
      res.status(404).json({ error: "Organization not found" });
    } else {
      res.status(200).json(organizationDetails);
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Failed to fetch organization details" });
    }
  }
}
