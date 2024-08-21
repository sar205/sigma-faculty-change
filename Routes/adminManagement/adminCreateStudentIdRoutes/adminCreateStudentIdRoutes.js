const express = require("express");
const multer = require('multer');


const router = express.Router();
const { admincreateStudent, adminupdateStudent,admindeleteStudent } = require('../../../Controller/adminManagement/adminCreateStudentIdControl/adminCreateStudentIdControl');
const upload = multer({ dest: 'uploads/' });

router.post('/api/fca/create/student', upload.single('file'), admincreateStudent);

router.route('/api/fca/update/student/:id').put(adminupdateStudent);

router.route('/api/fca/delete/student/:id').delete(admindeleteStudent);





module.exports = router;