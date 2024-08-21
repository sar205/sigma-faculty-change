const express = require('express');
const router = express.Router();
const { getAllPlanners, createPlanner, updatePlanner, deletePlanner,getPlannerById,setActualDate } = require('../../../Controller/facultyManageControl/facultyPlannerControl/facultyPlannerControl');




router.post('/api/fca/faculty/create/planner', createPlanner);

router.post('/api/fca/faculty/set/actual/date/:id', setActualDate);


router.put('/api/fca/faculty/update/planner/:id', updatePlanner);

router.delete('/api/fca/faculty/delete/planner/:id', deletePlanner);


router.get('/api/fca/faculty/getall/planner', getAllPlanners);

router.get('/api/fca/faculty/getsingel/planner/:id', getPlannerById);


module.exports = router;
