const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  StudentName: {
    type: String
   
  },
  EnrollmentNumber:{
    type: String
  },

 
  Dept: {
    type: String
  },

  Div:{
    type : String
  },

  Sem:{
    type : String
  }
  
});

const Student = mongoose.model('StudentStore', studentSchema);

module.exports = Student;
