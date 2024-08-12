import { createPool } from 'mysql2';
import config from './config.js';

export const pool = createPool({
    host: config.hostname,
    user: config.username,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

export const query = async (sql, params) => {
  try {
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (err) {
    throw err;
  }
};
