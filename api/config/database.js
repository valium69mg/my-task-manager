require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2/promise');
const knex = require('./knex.js');

let pool;

async function initDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  await connection.end();

  try {
      console.log('Running migrations...');
      await knex.migrate.latest();
      console.log('Migrations complete!');

  } catch (err) {
      console.error('Migration failed:', err);
      process.exit(1);
  }
  

  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
}

function getPool() {
  if (!pool) throw new Error('Database pool not initialized');
  return pool;
}

module.exports = { initDatabase, getPool };
