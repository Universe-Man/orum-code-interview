import { Database } from "sqlite3";

const db = new Database("../transfers.db");

import express, { Request, Response } from "express";
import transferRoutes from "./routes/transferRoutes";
import accountRoutes from "./routes/accountRoutes";
import customerRoutes from "./routes/customerRoutes";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", transferRoutes);
app.use("/api", accountRoutes);
app.use("/api", customerRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Ian Pollack's Orum Interview API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});