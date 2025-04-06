import getDatabase from "../db";

const db = getDatabase();

// I only implemented fetch methods for this challenge,
// but for a full application I would add create, update, and delete methods.

// This service file contains the logic for querying the deals table.
export function fetchDeals() {
  const deals = db.prepare("SELECT * FROM deals").all();
  return deals;
}

export function fetchDealById(id: number) {
  const deal = db.prepare("SELECT * FROM deals WHERE id = ?").get(id);
  return deal;
}

export function fetchDealsByAccountId(accountId: number) {
  const deals = db
    .prepare("SELECT * FROM deals WHERE account_id = ?")
    .all(accountId);
  return deals;
}
