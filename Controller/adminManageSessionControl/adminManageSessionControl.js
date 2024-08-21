
const Professor = require('../../MongoDb/adminManageSessionMongo/adminManageSessionMongo');


// Post Api
exports.createProfessor = async (req, res) => {
    try {
        const { professor, department, division, lecture, semester } = req.body;

        const newProfessor = new Professor({
            professor,
            department,
            division,
            lecture,
            semester
        });

        await newProfessor.save();

        res.status(201).json({ message: 'Professor created successfully', professor: newProfessor });
    } catch (error) {
        res.status(500).json({ message: 'Error creating professor', error });
    }


};

// Update API
exports.updateProfessor = async (req, res) => {
    try {
        const { id } = req.params;
        const { professor, department, division, lecture, semester } = req.body;

        const updatedProfessor = await Professor.findByIdAndUpdate(
            id,
            {
                professor,
                department,
                division,
                lecture,
                semester
            },
            { new: true }
        );

        if (!updatedProfessor) {
            return res.status(404).json({ message: 'Professor not found' });
        }

        res.status(200).json({ message: 'Professor updated successfully', professor: updatedProfessor });
    } catch (error) {
        res.status(500).json({ message: 'Error updating professor', error });
    }
};

// Delete API
exports.deleteProfessor = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProfessor = await Professor.findByIdAndDelete(id);

        if (!deletedProfessor) {
            return res.status(404).json({ message: 'Professor not found' });
        }

        res.status(200).json({ message: 'Professor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting professor', error });
    }
};


// Get Api All Data
exports.getProfessors = async (req, res) => {
    try {
        const professors = await Professor.find();
        res.status(200).json(professors);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving professors', error });
    }
};



// Get Api BY Id
exports.getProfessorById = async (req, res) => {
    try {
        const professor = await Professor.findById(req.params.id);
        if (!professor) {
            return res.status(404).json({ message: 'Professor not found' });
        }
        res.status(200).json(professor);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving professor', error });
    }
};

