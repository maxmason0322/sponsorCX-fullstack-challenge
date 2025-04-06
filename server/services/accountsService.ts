import getDatabase from "../db";

const db = getDatabase();

// I only implemented fetch methods for this challenge,
// but for a full application I would add create, update, and delete methods.

// This service file contains the logic for querying the accounts table.
export function fetchAccounts() {
  const accounts = db.prepare("SELECT * FROM accounts").all();
  return accounts;
}

export function fetchAccountById(id: number) {
  const account = db.prepare("SELECT * FROM accounts WHERE id = ?").get(id);
  return account;
}

export function fetchAccountsByOrganizationId(organizationId: number) {
  const accounts = db
    .prepare("SELECT * FROM accounts WHERE organization_id = ?")
    .all(organizationId);
  return accounts;
}
