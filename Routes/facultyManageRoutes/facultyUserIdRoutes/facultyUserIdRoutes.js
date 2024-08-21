const express = require("express");

const router = express.Router();
const { createFacultyUser,updateFacultyUser,deleteFacultyUser,getFacultyUserById,getAllFacultyUsers, loginFacultyUser} = require('../../../Controller/facultyManageControl/facultyUserIdControl/facultyUserIdControl');


router.route('/api/fca/create/faculty').post(createFacultyUser);

router.route('/api/fca/faculty/user/update/:id').put(updateFacultyUser);

router.route('/api/fca/faculty/user/delete/:id').delete(deleteFacultyUser);

router.route('/api/fca/single/faculty/user/:id').get(getFacultyUserById);

router.route('/api/fca/all/faculty/user').get(getAllFacultyUsers);


router.route('/api/fca/faculty/login').post(loginFacultyUser);

module.exports = router;