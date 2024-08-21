const mongoose = require('mongoose');
const Professor = require('../../adminManageSessionMongo/adminManageSessionMongo');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: { type: String, required: true },
    enrollno: { type: String, required: true },
    absent: { type: Boolean, required: true },
    present: { type: Boolean, required: true }
});

const attendanceSchema = new Schema({
    date: { type: Date, required: true },
    lecture: { type: String, required: true },
    div: { type: String, required: true },
    dept: { type: String, required: true },
    sem: { type: String, required: true },
    students: [studentSchema],
    professor: {type : String,required: true}
});

const Attendance = mongoose.model('facultyperform', attendanceSchema);

module.exports = Attendance;
