const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user_login"
});

connection.connect((err) => {
  if (err) {
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Access denied. Please check your credentials.');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error('Database not found.');
    } else {
      throw err; // Rethrow non-MySQL errors
    }
  } else {
    console.log('Connected to MySQL server.');
    // Continue with your database operations
  }
});


