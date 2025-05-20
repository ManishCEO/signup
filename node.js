const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 5500;

// Serve static files from public directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'userdata'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { user, password } = req.body;

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [user, password], (err, result) => {
    if (err) throw err;
    console.log('Data inserted:', result);
    res.send('User registered successfully!');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
