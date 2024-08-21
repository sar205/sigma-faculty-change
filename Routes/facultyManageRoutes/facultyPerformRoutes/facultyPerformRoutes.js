const express = require('express');
const router = express.Router();
const attendanceController = require('../../../Controller/facultyManageControl/facultyPerformControl/facultyPerformControl'); // Update the path to your attendanceController

// Create a new attendance record
router.post('/api/fca/faculty/attendance', attendanceController.createAttendance);


//trail

router.get('/api/trail', attendanceController.getAttendance);

module.exports = router;