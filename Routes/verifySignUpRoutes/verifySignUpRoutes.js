const express = require('express');

const router = express.Router();

const {verifyOTP} = require('../../Controller/verifySignUpControl/verifySignUpControl');

router.route('/api/verify/sigma/admin/signup').post(verifyOTP);


module.exports = router;