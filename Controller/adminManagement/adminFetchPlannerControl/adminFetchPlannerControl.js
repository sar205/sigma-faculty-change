const Planner = require('../../../MongoDb/facultyManageMongo/facultyPlannerMongo/facultyPlannerMongo');

// Get a specific planner by ERP and actual date
exports.getPlannerforAdmin = async (req, res) => {
    try {
        const { erp, actualDate } = req.params;  // Extract ERP and actualDate from the request parameters

        // Convert the actualDate from string to Date object
        const date = new Date(actualDate);

        const planner = await Planner.findOne({ erp, actualDate: date });

        if (!planner) {
            return res.status(404).json({ error: 'Planner not found for the provided ERP and actual date' });
        }

        res.status(200).json(planner);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch planner' });
    }
};




