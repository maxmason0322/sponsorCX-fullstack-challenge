import express from "express";
import cors from "cors";
import getDatabase from "./db";
import organizationsRoutes from "./routes/organizations";
import accountsRoutes from "./routes/accounts";
import dealsRoutes from "./routes/deals";

const app = express();
const port = process.env.PORT || 3000;

/**
 * Welcome to the Fullstack Challenge for the Server!
 *
 * This is a basic express server.
 * You can customize and organize it to your needs.
 * Good luck!
 */
const db = getDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/organizations", organizationsRoutes);
app.use("/accounts", accountsRoutes);
app.use("/deals", dealsRoutes);

app.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM organizations").all();
  res.json({ message: "Welcome to the server! 🎉", rows });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
