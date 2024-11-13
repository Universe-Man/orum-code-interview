import { Database } from "sqlite3";

const db = new Database("../transfers.db", (err) => {
  if (err) {
    console.error(err.message);
  };
  console.log('Connected to the Transfers Database.');
});

const validateCustomer = (id: string): boolean => {
  console.log("customer valid", id);
  let valid_customer = false;
  db.get(`SELECT * FROM customers WHERE id = ?`, [id], (row) => {
    if (row) {
      valid_customer = true;
    };
  });
  return valid_customer;
};

export default validateCustomer;