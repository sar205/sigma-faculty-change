const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  }
});

const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;
