const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv");
const Timetable = require('../../../MongoDb/adminManagement/adminCreateTimeMongo/adminCreateTimeMongo');
const FacultyUser = require('../../../MongoDb/facultyManageMongo/facultyUserIdMongo/facultyUserIdMongo');
const crypto = require('crypto');

exports.createFacultyUser = async (req, res) => {
  try {
    const { erp, name, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new FacultyUser({ erp, name, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Generate a random token
    const token = crypto.randomBytes(100 ).toString('hex');

    // Store the token in the user object
    newUser.token = token;
    await newUser.save();  // Save the updated user with the token

    // Respond with the new user and token
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Update a faculty user
exports.updateFacultyUser = async (req, res) => {
  try {
    const { erp, name, password } = req.body;
    const updatedUser = await FacultyUser.findByIdAndUpdate(
      req.params.id,
      { email, name, password },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a faculty user
exports.deleteFacultyUser = async (req, res) => {
  try {
    const deletedUser = await FacultyUser.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single faculty user by ID
exports.getFacultyUserById = async (req, res) => {
  try {
    const user = await FacultyUser.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all faculty users
exports.getAllFacultyUsers = async (req, res) => {
  try {
   
    const authHeader = req.headers.authorization;


    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }


    const token = authHeader.split(' ')[1];

    const user = await FacultyUser.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.loginFacultyUser = async (req, res) => {
  try {
    const { check, password, lectureType, regularErp } = req.body;

    const userSr = await FacultyUser.findOne({
      $or: [{ erp: check }, { name: check }]
    });

    if (!userSr) {
      return res.status(400).json({ message: 'Invalid ERP or name' });
    }

    const isPasswordValid = await bcrypt.compare(password, userSr.password);
    const token = userSr.token;

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // If lectureType is not provided, it's a Planner login
    if (!lectureType) {
      return res.status(200).json({ message: "Login Successful", user: userSr, timetableEntries: [], token });
    }

    if (lectureType === "R") {
      const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
      const dayRegex = new RegExp(`^${currentDay}$`, 'i');
      
      const timetableEntries = await Timetable.find({ erp: userSr.erp, day: dayRegex });

      return res.status(200).json({ message: "Login Successful", user: userSr, timetableEntries, token });
    } else if (lectureType === "P") {

      if (!regularErp) {
        return res.status(400).json({ message: 'Regular ERP is required for proxy lecture' });
      }

      const regularUser = await FacultyUser.findOne({ erp: regularErp });

      if (!regularUser) {
        return res.status(400).json({ message: 'Invalid regular ERP' });
      }

      const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
      const dayRegex = new RegExp(`^${currentDay}$`, 'i');

      const timetableEntries = await Timetable.find({ erp: regularErp, day: dayRegex });

      if (timetableEntries.length === 0) {
        return res.status(400).json({ message: 'Today you do not have any lectures for this regular ERP' });
      }

      return res.status(200).json({ message: "Login Successful", user: regularUser, timetableEntries, token });
    } else {
      return res.status(400).json({ message: 'Invalid lecture type' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};