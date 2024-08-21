const express = require('express');
const router = express.Router();

// Import the attendance controller
const attendanceController = require('../../../Controller/adminManagement/adminFetchAttenControl/adminFetchAttenControl');

// Route to get attendance by ERP and Date
router.get('/api/fca/admin/fetch/atten/:erp/:date', attendanceController.getAttendanceByErpAndDate);

module.exports = router;
