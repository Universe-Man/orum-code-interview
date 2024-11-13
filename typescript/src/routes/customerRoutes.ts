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

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
};

router.get("/customers", (req: Request, res: Response) => {
  // NOTE: Having some issues with the offset based on page, will return to fix if time permits. Currently only displays first 10 items.

  // const page = req.query.page || 1;
  // const offset = (page - 1) * config.listPerPage;
  // db.all("SELECT * FROM transfers LIMIT ?, ?", [offset, config.itemsPerPage] , (err, rows) => {

  db.all("SELECT * FROM customers LIMIT ?", [config.itemsPerPage], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    };
  });
});

router.get("/customers/:id", (req: Request, res: Response) => {
  const transferId = req.params.id;
  db.get(`SELECT * FROM customers WHERE id = ?`, [transferId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: "Customer Not Found" });
    };
  });
});

// router.post('/customers', (req: Request, res: Response) => {
//   const { customer_id, account_number, routing_number } = req.body;
//   if (!customer_id || !account_number, !routing_number) {
//     res.status(400).send('Customer ID, Account Number, and Routing Number are Required');
//   } else {
//     // VALIDATIOIN

    
//     const sql = 'INSERT INTO customers (name, price) VALUES (?, ?)';
//     db.run(sql, [name, price], function (err: Error | null) {
//       if (err) {
//         console.error(err.message);
//         res.status(500).send('Internal Server Error');
//       } else {
//         const id = this.lastID;
//         res.status(201).send({ id, name, price });
//       }
//     });
//   }
// });


// router.get("/transfers/:id", (req: Request, res: Response) => {
//   const transferId = req.params.id;
//   db.get(`SELECT * FROM transfers WHERE id = ?`, [transferId], (err, row) => {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send('Internal Server Error');
//     } else if (row) {
//       res.json(row);
//     } else {
//       res.status(404).json({ message: "Transfer Not Found" });
//     };
//   });
// });

export default router;