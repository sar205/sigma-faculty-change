
const Student = require('../../../MongoDb/adminManagement/adminCreateStudentIdMongo/adminCreateStudentIdMongo');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');

// Utility functions
const handleCSV = (path) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

const handleExcel = (path) => {
    const workbook = xlsx.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
};

const admincreateStudent = async (req, res) => {
    try {
        // Check if the request contains a file
        if (req.file) {
            const filePath = req.file.path;
            let students;

            if (req.file.mimetype === 'text/csv') {
                students = await handleCSV(filePath);
            } else if (
                req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                req.file.mimetype === 'application/vnd.ms-excel'
            ) {
                students = await handleExcel(filePath);
            } else {
                return res.status(400).send('Unsupported file format');
            }

            // Save each student to the database individually
            const studentPromises = students.map(student => {
                // Ensure the student object matches the schema
                const studentData = {
                    StudentName: student.StudentName || '',
                    EnrollmentNumber: student.EnrollmentNumber || '',
                    Dept: student.Dept || '',
                    Div: student.Div || '',
                    Sem: student.Sem || ''
                };
                return new Student(studentData).save();
            });

            await Promise.all(studentPromises);

            // Clean up uploaded file
            fs.unlinkSync(filePath);

            return res.status(201).json({
                success: true,
                message: 'Students added successfully',
                data: students,
            });
        }

        // If no file, check for manually entered student data
        const studentData = req.body;

        // Create a new student instance
        const newStudent = new Student(studentData);

        // Save the student to the database
        await newStudent.save();

        // Send a response back to the client
        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: newStudent,
        });
    } catch (error) {
        console.error('Error creating student:', error);

        res.status(500).json({
            success: false,
            message: 'Error creating student',
            error: error.message,
        });
    }
};

const adminupdateStudent = async (req, res) => {
    try {
        const studentId = req.params.id; // Get the student ID from the URL parameters
        const updatedData = req.body; // Get the updated data from the request body

        // Find and update the student in the database
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            updatedData,
            { new: true, runValidators: true } // Return the updated document and run validation
        );

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            });
        }

        // Send a response back to the client
        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: updatedStudent,
        });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating student',
            error: error.message,
        });
    }
};

const admindeleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id; // Get the student ID from the URL parameters

        // Find and delete the student from the database
        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            });
        }

        // Send a response back to the client
        res.status(200).json({
            success: true,
            message: 'Student deleted successfully',
            data: deletedStudent,
        });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting student',
            error: error.message,
        });
    }
};



// Get all data
const admingetAllStudents = async (req, res) => {
    try {
        // Extract the section and subjectCode from the request body
        const { section, subjectCode } = req.body;
        
        if (!subjectCode) {
            // If subjectCode is not provided, return an error
            return res.status(400).json({
                success: false,
                message: 'subjectCode is required in the request body',
            });
        }

        // Extract semester (Sem) from the first character of subjectCode
        const Sem = subjectCode.charAt(0); // First character represents the semester
        
        // Extract department (Dept) by finding the position of the first non-alphabet character after the semester
        let Dept = '';
        for (let i = 1; i < subjectCode.length; i++) {
            if (!isNaN(subjectCode.charAt(i))) {
                break;
            }
            Dept += subjectCode.charAt(i);
        }
        Dept = Dept.toUpperCase(); // Ensure the department code is uppercase

        // Create the query object based on section (Div) and extracted Sem and Dept
        let query = {};
        if (section) {
            query.Div = section; // Match section with Section field
        }
        if (Dept) {
            query.Dept = Dept; // Use extracted Dept
        }
        if (Sem) {
            query.Sem = Sem; // Use extracted Sem
        }

        if (Object.keys(query).length === 0) {
            // If no valid filters are specified, return an error
            return res.status(400).json({
                success: false,
                message: 'At least one valid filter (section, Sem, Dept) is required in the request body',
            });
        }

        // Filter students based on the query object
        const students = await Student.find(query);

        // Send a response back to the client
        res.status(200).json({
            success: true,
            data: students,
        });
    } catch (error) {
        console.error('Error retrieving students:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving students',
            error: error.message,
        });
    }
};



// Get Singel data
const admingetStudentById = async (req, res) => {
    try {
        const studentId = req.params.id; // Get the student ID from the URL parameters

        const student = await Student.findById(studentId); // Retrieve the student from the database

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            });
        }

        // Send a response back to the client
        res.status(200).json({
            success: true,
            data: student,
        });
    } catch (error) {
        console.error('Error retrieving student:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving student',
            error: error.message,
        });
    }
};




module.exports = { admincreateStudent, adminupdateStudent, admindeleteStudent,admingetAllStudents };