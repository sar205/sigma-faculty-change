const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentname: { type: String,  },
    enrollmentnumber: { type: String,  },
    ap : {type: String, }
   

});

const attendanceSchema = new Schema({
    date: { type: Date, },
    subjectCode :  { type: String, },
    div: { type: String,  },
    dept: { type: String,  },
    sem: { type: String,  },
    students: [studentSchema],
 
    erp : {type : String,},
    proxyerp : {type : String,},
    day : {type : String,}

});

const Attendance = mongoose.model('facultystudentattendance', attendanceSchema);

module.exports = Attendance;
