import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    ENV,
    DB_NAME_TEST
} = process.env;


export let pool: Pool;

if(ENV === 'dev') {
    pool = new Pool({
        host:DB_HOST,
        user:DB_USER,
        password:DB_PASSWORD,
        port: parseInt(DB_PORT as string),
        database:DB_NAME
    })
}

if(ENV === 'test') {
    pool = new Pool({
        host:DB_HOST,
        user:DB_USER,
        password:DB_PASSWORD,
        port: parseInt(DB_PORT as string),
        database:DB_NAME_TEST
    })
}






