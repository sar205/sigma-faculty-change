const Attendance = require('../../../MongoDb/facultyManageMongo/facultyPerformMongo/facultyPerformMongo'); // Update the path to your Attendance model

// Create a new attendance record
exports.createAttendance = async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).json({ message: 'Attendance record created successfully', data: attendance });
    } catch (error) {
        res.status(400).json({ message: 'Error creating attendance record', error });
    }
};

//triall

// Get attendance records with filters from the body
exports.getAttendance = async (req, res) => {
    try {
        const { date, lecture, division, department, semester, professor } = req.body;

        // Create a filter object with provided parameters
        let filter = {};
        if (date) filter.date = date;
        if (lecture) filter.lecture = lecture;
        if (division) filter.division = division;
        if (department) filter.department = department;
        if (semester) filter.semester = semester;
        if (professor) filter.professor = professor;

        // Find attendance records that match the filter
        const attendanceRecords = await Attendance.find(filter);

        // Check if any records were found
        if (attendanceRecords.length > 0) {
            res.status(200).json({ message: 'Attendance records retrieved successfully', data: attendanceRecords });
        } else {
            res.status(404).json({ message: 'No attendance records found matching the criteria' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving attendance records', error });
    }
};