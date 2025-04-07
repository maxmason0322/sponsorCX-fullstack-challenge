import getDatabase from "../db";
import {
  Organization,
  OrganizationDetails,
  Account,
  Deal,
} from "../types/global.types";

const db = getDatabase();

// I only implemented fetch methods for this challenge,
// but for a full application I would add create, update, and delete methods.

// This service file contains the logic for querying the organizations table.
export function fetchOrganizations() {
  const organizations = db.prepare("SELECT * FROM organizations").all();
  return organizations;
}

export function fetchOrganizationById(id: number) {
  const organization = db
    .prepare("SELECT * FROM organizations WHERE id = ?")
    .get(id);
  return organization;
}

export function fetchOrganizationDetails(
  id: number
): OrganizationDetails | null {
  // Get organization
  const organization = db
    .prepare("SELECT * FROM organizations WHERE id = ?")
    .get(id) as Organization | null;

  if (!organization) {
    return null;
  }

  // Get all accounts for this organization
  const accounts = db
    .prepare("SELECT * FROM accounts WHERE organization_id = ?")
    .all(id) as Account[];

  // Get all deals for these accounts
  const accountIds = accounts.map((account) => account.id);
  const deals =
    accountIds.length > 0
      ? (db
          .prepare(
            `SELECT * FROM deals WHERE account_id IN (${accountIds
              .map(() => "?")
              .join(",")})`
          )
          .all(...accountIds) as Deal[])
      : [];

  // Group deals by account
  const dealsByAccount = deals.reduce((acc: Record<number, Deal[]>, deal) => {
    if (!acc[deal.accountId]) {
      acc[deal.accountId] = [];
    }
    acc[deal.accountId].push(deal);
    return acc;
  }, {});

  // Attach deals to their respective accounts
  const accountsWithDeals = accounts.map((account) => ({
    ...account,
    deals: dealsByAccount[account.id] || [],
  }));

  return {
    ...organization,
    accounts: accountsWithDeals,
  };
}
