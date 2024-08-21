const express = require('express');
const router = express.Router();
const timetableController = require('../../../Controller/adminManagement/adminCreateTimeControl/adminCreateTimeControl');

router.post('/api/fca/create/time/table', timetableController.createTimetable);

router.put('/api/fca/update/time/table/:id', timetableController.updateTimetable);

router.delete('/api/fca/delete/time/table/:id', timetableController.deleteTimetable);

router.get('/api/fca/get/time/table', timetableController.getAllTimetables);

module.exports = router;
