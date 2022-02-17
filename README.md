# Udacity Storefront Backend Project

This is a backend API builds in Nodejs for online store.

The database schema and API Route information can be found in [REQUIREMENT.md](REQUIREMENTS.md)

## Installation Instructions
To install all packages.

`npm install`

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

### .env file

```
DB_HOST = localhost
DB_PORT = 5432
DB_NAME = store
DB_USER = postgres
DB_PASSWORD = 1234567890
DB_NAME_TEST = store_test
BCRYPT_PASSWORD = your-secret-password
SALT_ROUNDS = 10
TOKEN_SECRET = amr123
TOKEN_TEST = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6MTAsImZpcnN0bmFtZSI6ImFtciIsImxhc3RuYW1lIjoiYWx5IiwidXNlcm5hbWUiOiJhbXIiLCJwYXNzd29yZCI6IiQyYiQxMCRTRlEub0xxQkJCckxRMG5PWlhrbzNPYUlEOGttUEVZVE5oNzlDd1I3T2E3dHhmaGVEN21VNiIsImlhdCI6MTY0NDU5OTI5Mn0.
dPnKw1xblMld4AaDIQOEk2EbFT-_D3UUc9PeFIpJKYg
ENV=dev
```

## Set up Database
### Create Database

- connect to default postgres database as the server's root user `psql -u postgres`
- In psql run following to create a user
    - `CREATE USER postgres with PASSWORD '1234567890';`
- In psql to create Database
    - `CREATE DATABASE store;`
- In psql to create test database
    - `CREATE DATABASE store_test`

## START App
- `npm run watch`
- `npm start`

## Running Ports

Server will start on port `3000` and database on port `5432`

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 

## Testing

-`npm run test`


# Important Notes 

### Environment Variables
Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github.