import { Router, Request, Response } from "express";
import { Database } from "sqlite3";
const router = Router();
const config = require('../config');

const db = new Database("../transfers.db", (err) => {
  if (err) {
    console.error(err.message);
  };
  console.log('Connected to the Transfers Database.');
});

interface Transfer {
  id: string;
  timestamp: string;
  amount: number;
  status: string;
  source_customer_name: string;
  source_account_id: number;
  destination_customer_name: string;
  destination_account_id: number;
};

const transfersGetSql = "SELECT transfers.id, transfers.timestamp, transfers.amount, transfers.status, CONCAT(source_customers.first_name, ' ', source_customers.last_name) AS source_customer_name, transfers.source_account_id, CONCAT(dest_customers.first_name, ' ', dest_customers.last_name) AS destination_customer_name, transfers.dest_account_id AS destination_account_id FROM transfers JOIN accounts AS source_accounts ON transfers.source_account_id = source_accounts.id JOIN customers AS source_customers ON source_accounts.customer_id = source_customers.id JOIN accounts AS dest_accounts ON transfers.dest_account_id = dest_accounts.id JOIN customers AS dest_customers ON dest_accounts.customer_id = dest_customers.id";

router.get("/transfers", (req: Request, res: Response) => {
  // NOTE: Having some issues with the offset based on page, will return to fix if time permits. Currently only displays first 10 items.

  // const page = req.query.page || 1;
  // const offset = (page - 1) * config.listPerPage;
  // db.all("SELECT * FROM transfers LIMIT ?, ?", [offset, config.itemsPerPage] , (err, rows) => {

  db.all(`${transfersGetSql} LIMIT ?`, [config.itemsPerPage], (err, rows) => {
    // db.all("SELECT * FROM transfers WHERE status ? LIMIT ?", [req.query.status, config.itemsPerPage], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    };
  });
});

router.get("/transfers/:id", (req: Request, res: Response) => {
  const transferId = req.params.id;
  db.get(`${transfersGetSql} WHERE transfers.id = ?`, [transferId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: "Transfer Not Found" });
    };
  });
});

export default router;