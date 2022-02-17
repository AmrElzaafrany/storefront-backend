/* Replace with your SQL commands */

CREATE TYPE stat AS ENUM ('active', 'complete');


CREATE TABLE orders (
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL REFERENCES users (id),
status stat NOT NULL
);