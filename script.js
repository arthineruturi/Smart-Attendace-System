// Fetch student data from the server
fetch('/students')
  .then(response => response.json())
  .then(data => {
    const studentList = document.getElementById('student-list');

    // Display student roll numbers and attendance dropdowns
    data.forEach(rollNumber => {
      const listItem = document.createElement('li');
      const studentRollNumber = document.createElement('span');
      studentRollNumber.classList.add('student-roll-number');
      studentRollNumber.textContent = rollNumber;
      const attendanceDropdown = document.createElement('select');
      attendanceDropdown.classList.add('attendance-dropdown');

      // Add options for attendance (Present, Absent, OD)
      const attendanceOptions = ['Present', 'Absent', 'OD'];
      attendanceOptions.forEach(option => {
        const attendanceOption = document.createElement('option');
        attendanceOption.text = option;
        attendanceDropdown.add(attendanceOption);
      });

      listItem.appendChild(studentRollNumber);
      listItem.appendChild(attendanceDropdown);
      studentList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error(error);
    alert('Error retrieving student data');
  });
