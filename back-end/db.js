import pg from 'pg';
import fs from 'fs';

const { Pool } = pg;

import config from "./config.js";

export const pool = new Pool({
  connectionString: config.POSTGRES_URL,
})

export const query = async (text, params) => {
  try {
    const { rows } = await pool.query(text, params);
    return rows;
  } catch (err) {
    throw err;
  }
};

const createTable = async () => {
  try {
    const sql = fs.readFileSync("./scripts/createTable.sql", 'utf8');
    await pool.query(sql);
    console.log('Table created or already exists');
  } catch (err) {
    console.error('Error creating table:', err);
  }
};

createTable().then(() => pool.end());