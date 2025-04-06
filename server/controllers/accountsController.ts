import { Request, Response } from "express";
import {
  fetchAccounts,
  fetchAccountById,
  fetchAccountsByOrganizationId,
} from "../services/accountsService";

// If I had more time, I would abstract out the error handling into a utility function.

// This controller file interacts with the accounts service layer and is
// responsible for handling the HTTP requests.
export function getAccounts(req: Request, res: Response) {
  try {
    const accounts = fetchAccounts();
    res.status(200).json(accounts);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Failed to fetch accounts" });
    }
  }
}

export function getAccountById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const account = fetchAccountById(Number(id));
    if (!account) {
      res.status(404).json({ error: "Account not found" });
    } else {
      res.status(200).json(account);
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Failed to fetch account" });
    }
  }
}

export function getAccountsByOrganizationId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const accounts = fetchAccountsByOrganizationId(Number(id));
    res.status(200).json(accounts);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Failed to fetch accounts" });
    }
  }
}
