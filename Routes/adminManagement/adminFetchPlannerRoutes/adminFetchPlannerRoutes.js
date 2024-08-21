const express = require('express');
const router = express.Router();
const { getPlannerforAdmin } = require('../../../Controller/adminManagement/adminFetchPlannerControl/adminFetchPlannerControl');






router.get('/api/fca/admin/getsingel/planner/:erp/:actualDate', getPlannerforAdmin);




module.exports = router;
