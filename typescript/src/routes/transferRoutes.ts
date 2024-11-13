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

router.get("/transfers", (req: Request, res: Response) => {
  // NOTE: Having some issues with the offset based on page, will return to fix if time permits. Currently only displays first 10 items.

  // const page = req.query.page || 1;
  // const offset = (page - 1) * config.listPerPage;
  // db.all("SELECT * FROM transfers LIMIT ?, ?", [offset, config.itemsPerPage] , (err, rows) => {

  db.all("SELECT * FROM transfers LIMIT ?", [config.itemsPerPage], (err, rows) => {
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
  db.get(`SELECT * FROM transfers WHERE id = ?`, [transferId], (err, row) => {
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