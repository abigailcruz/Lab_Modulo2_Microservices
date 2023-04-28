const sqlite3 = require('sqlite3').verbose();

const DB_FILE = './data/database.db';

const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the database.');
});

module.exports = db;