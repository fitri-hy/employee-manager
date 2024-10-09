const mysql = require('mysql2');
require('dotenv').config();  // Load .env file

const connection = mysql.createConnection({
  host: process.env.DB_HOST,       // Ambil dari .env
  user: process.env.DB_USER,       // Ambil dari .env
  password: process.env.DB_PASS,   // Ambil dari .env
  database: process.env.DB_NAME    // Ambil dari .env
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to the MySQL server.');
});

module.exports = connection;
