import getDatabase from "../db";

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
