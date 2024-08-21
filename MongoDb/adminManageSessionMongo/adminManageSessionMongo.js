
const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
  professor: { type: String, required: true },
  department: { type: String, required: true },
  division: { type: String, required: true },
  lecture: { type: String, required: true },
  semester: { type: String, required: true }
});

const Professor = mongoose.model('adminmanagesession', ProfessorSchema);

module.exports = Professor;
