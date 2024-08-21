const Planner = require('../../../MongoDb/facultyManageMongo/facultyPlannerMongo/facultyPlannerMongo');
const FacultyUser = require('../../../MongoDb/facultyManageMongo/facultyUserIdMongo/facultyUserIdMongo');
require("dotenv").config(); // Ensure dotenv is correctly configured
const jwt = require('jsonwebtoken');


// Create a new planner
exports.createPlanner = async (req, res) => {
    try {
        const {
            srno,
            nameOfTopic,
            hoursAlloted,
            plannedDate,
            actualDate,
            teachingAidCode,
            remarks,
            unit,
            planner,
            subjectCode
        } = req.body;

        // Extract token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        // Extract the token part from the Authorization header (assuming 'Bearer <token>')
        const token = authHeader.split(' ')[1];

        // Find the FacultyUser by the provided token
        const user = await FacultyUser.findOne({ token });

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        // Extract the erp from the found user
        const erp = user.erp;

        // Create a new planner with the provided token and other fields
        const newPlanner = new Planner({
            srno,
            nameOfTopic,
            hoursAlloted,
            plannedDate,
            actualDate,
            teachingAidCode,
            remarks,
            unit,
            planner,
            token,
            subjectCode,
            erp // Save erp from user data
        });

        const savedPlanner = await newPlanner.save();

        res.status(201).json(savedPlanner);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create planner' });
    }
};

//actual date post api 
exports.setActualDate = async (req, res) => {
    try {
        const { id } = req.params; // Get the ObjectId from the request parameters
        const { actualDate } = req.body; // Get the new actual date from the request body

        // Check if actualDate is provided
        if (!actualDate) {
            return res.status(400).json({ error: 'Bad Request: actualDate is required' });
        }

        // Find the planner by its ObjectId
        const planner = await Planner.findById(id);

        if (!planner) {
            return res.status(404).json({ error: 'Planner not found with the given id' });
        }

        // Update or set the actualDate
        planner.actualDate = actualDate;

        planner.enter = true
        const updatedPlanner = await planner.save();

        res.status(200).json(updatedPlanner);
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        res.status(500).json({ error: 'Failed to set or update actual date' });
    }
};




// Update a planner by ID
exports.updatePlanner = async (req, res) => {
    try {
        const {
            srno,
            nameOfTopic,
            hoursAlloted,
            plannedDate,
            actualDate,
            teachingAidCode,
            remarks,
            unit,
            planner
        } = req.body;

        const token = req.cookies.token; // Retrieve token from cookies

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token found in cookies' });
        }

        // Find the FacultyUser by the provided token
        const user = await FacultyUser.findOne({ token });

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        // Extract the erp from the found user
        const erp = user.erp;

        const updatedPlanner = await Planner.findByIdAndUpdate(
            req.params.id,
            {
                srno,
                nameOfTopic,
                hoursAlloted,
                plannedDate,
                actualDate,
                teachingAidCode,
                remarks,
                unit,
                planner,
                erp // Update erp from user data
            },
            { new: true, runValidators: true } // Ensure validation and return the updated document
        );

        if (!updatedPlanner) {
            return res.status(404).json({ error: 'Planner not found' });
        }

        res.status(200).json(updatedPlanner);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update planner' });
    }
};

// Delete a planner by ID
exports.deletePlanner = async (req, res) => {
    try {
        const deletedPlanner = await Planner.findByIdAndDelete(req.params.id);
        if (!deletedPlanner) {
            return res.status(404).json({ error: 'Planner not found' });
        }
        res.status(200).json({ message: 'Planner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete planner' });
    }
};

// Get all planners for a specific token
exports.getAllPlanners = async (req, res) => {
    try {
   
        const authHeader = req.headers.authorization;
        const subjectCode = req.headers['x-subject-code'];

        if (!authHeader || !subjectCode) {
            return res.status(401).json({ message: 'Unauthorized: No token or subjectCode provided' });
        }

        const token = authHeader.split(' ')[1];

        const planners = await Planner.find({ token, subjectCode });

        if (planners.length === 0) {
            return res.status(404).json({ message: 'No planners found with the provided token and subjectCode' });
        }

        res.status(200).json(planners);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch planners' });
    }
};









// Get a specific planner by ID
exports.getPlannerById = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token found in cookies' });
        }

        // Decode the token to extract subject code
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.error('JWT Verification Error:', error.message);
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Unauthorized: Invalid token format' });
            }
            return res.status(401).json({ error: 'Unauthorized: Token verification failed' });
        }

        const subjectCode = decoded.subjectCode;

        if (!subjectCode) {
            return res.status(400).json({ error: 'Subject code not found in token' });
        }

        const planner = await Planner.findOne({ subjectCode });

        if (!planner) {
            return res.status(404).json({ error: 'Planner not found' });
        }

        res.status(200).json(planner);
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch planner' });
    }
};

