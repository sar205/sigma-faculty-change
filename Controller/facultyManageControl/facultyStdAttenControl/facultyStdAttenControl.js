const Attendance = require('../../../MongoDb/facultyManageMongo/facultyStdAttenMongo/facultyStdAttenMongo'); 

// Create a new attendance record
exports.createAttendance = async (req, res) => {
    try {
        const { date, subjectCode, div, dept, sem, students, erp, proxyerp, day } = req.body;
    
       
        const newAttendance = new Attendance({
          date,
          subjectCode,
          div,
          dept,
          sem,
          students,
          erp,
          proxyerp,
          day
        });
    
        const savedAttendance = await newAttendance.save();
    
    
        res.status(201).json({
          message: 'Attendance saved successfully!',
          data: savedAttendance
        });
      } catch (error) {
        
        res.status(500).json({
          message: 'Failed to save attendance',
          error: error.message
        });
      }
};

// Get all attendance records
exports.getAllAttendances = async (req, res) => {
    try {
        const attendances = await Attendance.find();
        res.status(200).json(attendances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an attendance record by ID
exports.getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an attendance record by ID
exports.updateAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an attendance record by ID
exports.deleteAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
