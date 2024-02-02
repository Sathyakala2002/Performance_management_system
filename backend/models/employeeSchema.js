const mongoose = require("mongoose");

const employeSchema = new mongoose.Schema({
    employee_name: {
    type: String,
  },
  employee_ID: {
    type: String,
  },
  employee_email: {
    type: String,
  },
  password: {
    type: String,
  }, 
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
  },
  
});

module.exports = mongoose.model("employee", employeSchema);