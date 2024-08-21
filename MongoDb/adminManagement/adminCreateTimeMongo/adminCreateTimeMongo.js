const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
    erp: { type: String, required: true },
    day: { type: String, required: true },
    section: { type: String, required: true },
    subjectCode: { type: String, required: true }
});

module.exports = mongoose.model('Timetable', TimetableSchema);
