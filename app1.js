const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_login',
});

// Set the EJS view engine
app.set('view engine', 'ejs');

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to fetch student data and render the webpage
app.get('/', (req, res) => {
  const subjectsQuery = 'SELECT course_id FROM subjects';
  const studentsQuery = 'SELECT user_rollnumber, username FROM user_login';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }

    console.log('Connected to the database');

    let students = []; // Declare students as an empty array

    // Retrieve the course IDs from the subjects table
    connection.query(subjectsQuery, (err, subjects) => {
      if (err) {
        connection.release();
        throw err;
      }

      // Retrieve the student data
      connection.query(studentsQuery, (err, results) => {
        if (err) {
          connection.release();
          throw err;
        }

        students = results; // Populate the students array with retrieved data

        // Render the view with the retrieved subjects and student data
        res.render('index', { subjects, students });

        // Release the connection
        connection.release();
      });
    });
  });
});

// Handle the form submission for attendance
// Handle the form submission for attendance
app.post('/submit-attendance', (req, res) => {
  const attendanceData = req.body.attendance; // Assuming the select element's name is "attendance"
  const courseId = req.body.courseId;
  const currentDate = req.body.date;
  const currentTime = req.body.time;
  const slot = req.body.slot;
  const userRollno = req.body.user_rollno; // Access the value of user_rollno

  if (!attendanceData || !userRollno) {
    res.status(400).send('Attendance data is missing');
    return;
  }

  // Convert attendanceData to an array if it's a single value
  const attendanceArray = Array.isArray(attendanceData) ? attendanceData : [attendanceData];

  // Iterate over the submitted attendance data and update the database
  attendanceArray.forEach((attendance) => {
    const user_rollnumber = userRollno; // Use the userRollno value
    const courseId = req.body.courseId;
  const currentDate = req.body.date;
  const currentTime = req.body.time;
  const slot = req.body.slot;
    const query = `INSERT INTO attendance (user_rollnumber, course_id, date, time, slot) VALUES (?, ?, ?, ?, ?)`;
    const values = [user_rollnumber, courseId, currentDate, currentTime, slot];

    pool.query(query, values, (err, result) => {
      if (err) {
        console.error('Error updating attendance:', err);
        return;
      }

      console.log(`Attendance updated for user ${user_rollnumber}`);
    });
  });

  res.redirect('/attendance-updated');
});


app.get('/attendance-updated', (req, res) => {
  res.send('Attendance has been updated');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
