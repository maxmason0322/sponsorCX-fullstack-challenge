import { Request, Response } from "express";
import {
  fetchDeals,
  fetchDealById,
  fetchDealsByAccountId,
} from "../services/dealsService";

// If I had more time, I would abstract out the error handling into a utility function.

// This controller file interacts with the deals service layer and is
// responsible for handling the HTTP requests.
export function getDeals(req: Request, res: Response) {
  try {
    const deals = fetchDeals();
    res.status(200).json(deals);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Failed to fetch deals" });
    }
  }
}

export function getDealById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deal = fetchDealById(Number(id));
    if (!deal) {
      res.status(404).json({ error: "Deal not found" });
    } else {
      res.status(200).json(deal);
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Failed to fetch deal" });
    }
  }
}

export function getDealsByAccountId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deals = fetchDealsByAccountId(Number(id));
    res.status(200).json(deals);
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Failed to fetch deals" });
    }
  }
}
