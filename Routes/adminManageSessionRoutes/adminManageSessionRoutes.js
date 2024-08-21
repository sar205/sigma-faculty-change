// routes/professorRoutes.js
const express = require('express');
const router = express.Router();
const professorController = require('../../Controller/adminManageSessionControl/adminManageSessionControl');

router.post('/api/admin/session', professorController.createProfessor);

router.put('/api/admin/session/update/:id', professorController.updateProfessor);

router.delete('/api/admin/session/delete/:id',professorController.deleteProfessor);


router.get('/api/admin/session/allinfo', professorController.getProfessors);


router.get('/api/admin/session/oneinfo/:id', professorController.getProfessorById);



module.exports = router;
