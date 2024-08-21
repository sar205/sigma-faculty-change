const express = require('express');
const router = express.Router();
const attendanceController = require('../../../Controller/facultyManageControl/facultyStdAttenControl/facultyStdAttenControl'); // Adjust the path as needed

router.post('/api/fca/faculty/student/atten', attendanceController.createAttendance);

router.put('/api/fca/faculty/student/atten/update/:id', attendanceController.updateAttendanceById);
router.delete('/api/fca/faculty/student/atten/delete:id', attendanceController.deleteAttendanceById);

router.get('/api/fca/faculty/student/atten/getall', attendanceController.getAllAttendances);
router.get('/api/fca/faculty/student/atten/getsingel/:id', attendanceController.getAttendanceById);
module.exports = router;
