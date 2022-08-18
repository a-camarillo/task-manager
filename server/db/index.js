const { Pool, Client } = require('pg');
require('dotenv').config({path:'./../../.env'});

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

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}