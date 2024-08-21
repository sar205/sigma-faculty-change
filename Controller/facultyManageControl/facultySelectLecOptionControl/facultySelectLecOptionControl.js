const Student = require('../../../MongoDb/adminManagement/adminCreateStudentIdMongo/adminCreateStudentIdMongo');



// Get all data
exports.admingetAllStudents = async (req, res) => {
    try {
        // Extract the section and subjectCode from the request body
        const { section, subjectCode } = req.params;
        
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
