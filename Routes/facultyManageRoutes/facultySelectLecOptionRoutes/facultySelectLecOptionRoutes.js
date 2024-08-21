const express = require("express");



const router = express.Router();

const {admingetAllStudents} = require('../../../Controller/facultyManageControl/facultySelectLecOptionControl/facultySelectLecOptionControl');


router.route('/api/fca/getall/student/:section/:subjectCode').get(admingetAllStudents);

module.exports = router;