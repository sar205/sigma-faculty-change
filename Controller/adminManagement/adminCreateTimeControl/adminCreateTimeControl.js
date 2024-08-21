const Timetable = require('../../../MongoDb/adminManagement/adminCreateTimeMongo/adminCreateTimeMongo');

exports.createTimetable = async (req, res) => {
    try {
        const { erp, day, section, subjectCode } = req.body;
        const newEntry = new Timetable({ erp, day, section, subjectCode });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a timetable entry
exports.updateTimetable = async (req, res) => {
    try {
        const { erp, day, section, subjectCode } = req.body;
        const updatedEntry = await Timetable.findByIdAndUpdate(
            req.params.id,
            { erp, day, section, subjectCode },
            { new: true }
        );
        if (!updatedEntry) return res.status(404).json({ message: 'Entry not found' });
        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a timetable entry
exports.deleteTimetable = async (req, res) => {
    try {
        const deletedEntry = await Timetable.findByIdAndDelete(req.params.id);
        if (!deletedEntry) return res.status(404).json({ message: 'Entry not found' });
        res.status(200).json({ message: 'Entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all timetable entries
exports.getAllTimetables = async (req, res) => {
    try {
        const timetables = await Timetable.find();
        res.status(200).json(timetables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

