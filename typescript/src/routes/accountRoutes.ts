import { Router, Request, Response } from "express";
import { Database } from "sqlite3";
import validateCustomer from "../validations/customerValidations";
const router = Router();
const config = require('../config');

const db = new Database("../transfers.db", (err) => {
  if (err) {
    console.error(err.message);
  };
  console.log('Connected to the Transfers Database.');
});

interface Account {
  id: string;
  customer_id: string;
  account_number: number;
  routing_number: number;
};

router.get("/accounts", (req: Request, res: Response) => {
  // NOTE: Having some issues with the offset based on page, will return to fix if time permits. Currently only displays first 10 items.

  // const page = req.query.page || 1;
  // const offset = (page - 1) * config.listPerPage;
  // db.all("SELECT * FROM accounts LIMIT ?, ?", [offset, config.itemsPerPage] , (err, rows) => {

  db.all("SELECT * FROM accounts LIMIT ?", [config.itemsPerPage], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    };
  });
});

router.get("/accounts/:id", (req: Request, res: Response) => {
  const transferId = req.params.id;
  db.get(`SELECT * FROM accounts WHERE id = ?`, [transferId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: "Account Not Found" });
    };
  });
});

router.post('/accounts', (req: Request, res: Response) => {
  const { customer_id, account_number, routing_number } = req.body;
  if (!customer_id || !account_number || !routing_number) {
    res.status(400).send('Customer ID, Account Number, and Routing Number are Required');
  } else {
    // VALIDATIONS
    const valid_customer = validateCustomer(customer_id);
    if (!valid_customer) {
      res.status(404).send('Customer Not Found');
      return;
    };
    // CUSTOMER IS VALID

    // NOTE: Here is where the routing number validations will go, imported from a accountValidations file.

    const sql = 'INSERT INTO accounts (customer_id, account_number, routing_number) VALUES (?, ?, ?)';
    db.run(sql, [customer_id, account_number, routing_number], function (err: Error | null) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        const id = this.lastID;
        res.status(201).send({ id, customer_id, account_number, routing_number });
      }
    });
  }
});

export default router;