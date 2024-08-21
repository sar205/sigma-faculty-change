const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        return callback(null, origin);
    },
    credentials: true,
}));
app.use(bodyParser.json());

app.use(cookieParser());    
                                                              ///MongoDb all files here

//All Adminn Mongos

require('./MongoDb/config');
require('./MongoDb/otpSaveMongo/otpSaveMongo');
require('./MongoDb/signupMongo/signupMongo');
require('./MongoDb/adminManageSessionMongo/adminManageSessionMongo');
require('./MongoDb/adminManagement/adminCreateTimeMongo/adminCreateTimeMongo');
require('./MongoDb/adminManagement/adminCreateStudentIdMongo/adminCreateStudentIdMongo');

// All Faculty Mongo 
require('./MongoDb/facultyManageMongo/facultyUserIdMongo/facultyUserIdMongo');
require('./MongoDb/facultyManageMongo/facultyPerformMongo/facultyPerformMongo');
require('./MongoDb/facultyManageMongo/facultyStdAttenMongo/facultyStdAttenMongo');
require('./MongoDb/facultyManageMongo/facultyPlannerMongo/facultyPlannerMongo');






                                                        // All Routes here

//All Admin Routes


const sigma_admin_signup = require('./Routes/signUpRoutes/signUpRoutes');
const verify_sigma_admin_signup = require('./Routes/verifySignUpRoutes/verifySignUpRoutes');
const sigma_admin_login = require('./Routes/loginRoutes/loginRoutes');
const sigma_admin_session = require('./Routes/adminManageSessionRoutes/adminManageSessionRoutes');
const sigma_admin_timeTable = require('./Routes/adminManagement/adminCreateTimeRoutes/adminCreateTimeRoutes');
const sigma_admin_create_student = require('./Routes/adminManagement/adminCreateStudentIdRoutes/adminCreateStudentIdRoutes');
const sigma_admin_get_planner = require('./Routes/adminManagement/adminFetchPlannerRoutes/adminFetchPlannerRoutes');
const sigma_admin_fetch_attendance = require('./Routes/adminManagement/adminFetchAttenRoutes/adminFetchAttenRoutes');

//All Faculty Routes
const sigma_faculty = require('./Routes/facultyManageRoutes/facultyUserIdRoutes/facultyUserIdRoutes');
const sigma_faculty_perform = require('./Routes/facultyManageRoutes/facultyPerformRoutes/facultyPerformRoutes');
const sigma_faculty_stdatten = require('./Routes/facultyManageRoutes/facultyStdAttenRoutes/facultyStdAttenRoutes');
const sigma_faculty_select_lecture_option = require('./Routes/facultyManageRoutes/facultySelectLecOptionRoutes/facultySelectLecOptionRoutes');
const sigma_faculty_planner = require('./Routes/facultyManageRoutes/facultyPlannerRoutes/facultyPlannerRoutes');






                                                             //All Controllers here

// All Admin Controllers
app.use('/',sigma_admin_signup);
app.use('/',verify_sigma_admin_signup);
app.use('/',sigma_admin_login);
app.use('/', sigma_admin_session);
app.use('/', sigma_admin_timeTable);
app.use('/',sigma_admin_create_student);
app.use('/',sigma_admin_get_planner);
app.use('/',sigma_admin_fetch_attendance);




// All Faculty Controllers
app.use('/',sigma_faculty);
app.use('/',sigma_faculty_perform);
app.use('/',sigma_faculty_stdatten);
app.use('/',sigma_faculty_select_lecture_option);
app.use('/',sigma_faculty_planner);








app.get('/', (req, res) => {
    res.send("Jai Shree Ram");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port number ${port}`); 
});




