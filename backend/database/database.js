import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';

sqlite3.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = path.join(__dirname, 'shopstack.db');

const connection = new sqlite3.Database(databasePath, sqlite3.OPEN_READWRITE, (error) => {
  if (error) {
    console.error('Failed to connect to SQLite database:', error.message);
    process.exit(1);
  }
});

connection.serialize(() => {
  connection.run('PRAGMA foreign_keys = ON');
});

export const queryAll = (sql, params = []) =>
  new Promise((resolve, reject) => {
    connection.all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows);
    });
  });

export const queryOne = (sql, params = []) =>
  new Promise((resolve, reject) => {
    connection.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(row);
    });
  });

export default connection;
