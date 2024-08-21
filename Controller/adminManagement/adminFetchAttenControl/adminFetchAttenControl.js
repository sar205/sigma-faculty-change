const Attendance = require('../../../MongoDb/facultyManageMongo/facultyStdAttenMongo/facultyStdAttenMongo');

// Get attendance records by ERP and Date For Admin
exports.getAttendanceByErpAndDate = async (req, res) => {
    try {
        const { erp, date } = req.params;

        // Find all attendance records by ERP and Date
        const attendances = await Attendance.find({ erp: erp, date: date });

        if (attendances.length === 0) {
            return res.status(404).json({ message: 'No attendance records found' });
        }

        res.status(200).json(attendances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
