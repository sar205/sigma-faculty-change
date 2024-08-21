const express = require("express");

const router = express.Router();

const {signup} = require('../../Controller/signupControl/signupControl');

router.route('/api/sigma/admin/signup').post(signup);


module.exports = router;