CREATE TABLE customers (
    id TEXT NOT NULL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    email TEXT
);

CREATE TABLE accounts (
    id TEXT NOT NULL PRIMARY KEY,
    customer_id TEXT NOT NULL,
    routing_number TEXT,
    account_number TEXT,

    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE transfers (
    id TEXT NOT NULL PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    amount INTEGER NOT NULL,
    status TEXT NOT NULL,
    source_account_id TEXT,
    dest_account_id TEXT,

    FOREIGN KEY (source_account_id) REFERENCES accounts(id),
    FOREIGN KEY (dest_account_id) REFERENCES accounts(id)
);