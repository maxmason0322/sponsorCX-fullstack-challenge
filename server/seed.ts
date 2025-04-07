import getDatabase from "./db";

// Helper function to format dates for SQLite
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// Helper function to generate random deal status
const getRandomStatus = (): string => {
  const statuses = ["active", "pending", "completed"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Helper function to generate random deal value (in cents)
const getRandomValue = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min) * 100; // Convert to cents
};

// Helper function to generate random date within a range
const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

// Seed data
const seedData = async () => {
  const db = getDatabase();

  try {
    // Check if we need to seed the database
    interface CountResult {
      count: number;
    }
    const hasData = db
      .prepare("SELECT COUNT(*) as count FROM organizations")
      .get() as CountResult;

    if (hasData.count === 0) {
      // Start a transaction for seeding
      db.transaction(() => {
        // Insert organizations
        const insertOrg = db.prepare(
          "INSERT INTO organizations (name) VALUES (?)"
        );
        const org1 = insertOrg.run("TechCorp Inc.");
        const org2 = insertOrg.run("Global Sports");

        // Insert accounts for TechCorp
        const insertAccount = db.prepare(
          "INSERT INTO accounts (organization_id, name) VALUES (?, ?)"
        );
        const techCorpAccounts = [
          { name: "Acme Corporation" },
          { name: "Innovate Solutions" },
          { name: "Digital Dynamics" },
          { name: "TechStart Ventures" },
        ].map((account) =>
          insertAccount.run(org1.lastInsertRowid, account.name)
        );

        // Insert accounts for Global Sports
        const globalSportsAccounts = [
          { name: "Sports Gear Co" },
          { name: "Athletic Apparel" },
          { name: "Fitness Equipment Inc" },
          { name: "Sports Nutrition" },
        ].map((account) =>
          insertAccount.run(org2.lastInsertRowid, account.name)
        );

        // Generate deals for all accounts
        const insertDeal = db.prepare(`
          INSERT INTO deals (
            account_id, 
            start_date, 
            end_date, 
            value, 
            status
          ) VALUES (?, ?, ?, ?, ?)
        `);

        const allAccounts = [...techCorpAccounts, ...globalSportsAccounts];
        const today = new Date();
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        const oneYearFromNow = new Date(today);
        oneYearFromNow.setFullYear(today.getFullYear() + 1);

        // Create 3-5 deals for each account
        allAccounts.forEach((account) => {
          const numDeals = Math.floor(Math.random() * 3) + 3; // 3-5 deals per account

          for (let i = 0; i < numDeals; i++) {
            const startDate = getRandomDate(oneYearAgo, oneYearFromNow);
            const endDate = new Date(startDate);
            endDate.setMonth(
              endDate.getMonth() + Math.floor(Math.random() * 12) + 1
            ); // 1-12 months duration

            insertDeal.run(
              account.lastInsertRowid,
              formatDate(startDate),
              formatDate(endDate),
              getRandomValue(10000, 100000), // $100 - $1000
              getRandomStatus()
            );
          }
        });
      })();

      console.log("Database seeded with sample data!");
    } else {
      console.log("Database already contains data, skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

// Run the seed function
seedData().catch(console.error);
