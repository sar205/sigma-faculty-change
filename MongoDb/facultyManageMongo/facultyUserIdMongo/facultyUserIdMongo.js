const mongoose = require('mongoose');

const facultyUserId = new mongoose.Schema({

  name: {
    type: String,
  },
  erp:{
    type: String,
  },
  password: {
    type: String,
  },
token:{
  type:String
}
  
});

const facultyUser = mongoose.model('facultyUserId', facultyUserId);

module.exports = facultyUser;
