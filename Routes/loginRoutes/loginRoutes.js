const express = require("express");
const router = express.Router();
const { loginControl } = require("../../Controller/loginControl/loginControl");


router.route('/api/login/sigma/admin').post(loginControl);

module.exports = router