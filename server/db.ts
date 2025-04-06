import Database, { Database as DatabaseType } from "better-sqlite3";

let db: DatabaseType | null = null;

// This follows the singleton pattern to make sure only one instance of the database is created.
// I opted to implement it with this module pattern because it's simple and fits well with Node.js' module caching system.
// Another option would have been to use a singleton class instead.
function getDatabase(): DatabaseType {
  if (!db) {
    db = new Database("./database.sqlite", { verbose: console.log });
    initializeTables(db);
  }
  return db;
}

function initializeTables(db: DatabaseType) {
  // Create the organizations table
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS organizations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `
  ).run();

  // Create the accounts table
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      organization_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (organization_id) REFERENCES organizations(id)
    );
  `
  ).run();

  // Create the deals table
  // Note: I'm storing the value as an integer here to represent the monetary amount in cents
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS deals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id INTEGER NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      value INTEGER NOT NULL,
      status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (account_id) REFERENCES accounts(id)
    );
  `
  ).run();
}

export default getDatabase();
