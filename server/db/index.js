import pg from 'pg';
const { Pool, Client } = pg;
import 'dotenv/config';

const user = process.env.POSTGRES_USER;
const host = process.env.POSTGRES_HOST;
const password = process.env.POSTGRES_PASSWORD;
const port = process.env.POSTGRES_PORT;
const db = process.env.POSTGRES_DB;

const pool = new Pool({
    user: `${user}`,
    password: `${password}`,
    host: `${host}`,
    port: `${port}`,
    database: `${db}`  
});

export function query(text, params, callback) {
        return pool.query(text, params, callback)
};