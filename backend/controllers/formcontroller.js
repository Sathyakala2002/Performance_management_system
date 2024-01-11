const employee= require("../models/employeeSchema");
// const jwt = require("jsonwebtoken");

 
//create token
// const createToken = (user) => {
//   return jwt.sign({ user }, process.env.JWT_SECRET, {});
// };
 
// //get
// const getUser = async (req, res) => {
//   try {
//     const db = await user.find();
 
//     if (db.length) {
//       return res.status(200).send({ message: "Data fetched successfully", db });
//     } else {
//       return res.status(404).send({ message: "No data found in the DB" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ message: "Server error" });
//   }
// };
 
//registration
const employeeFormSubmit = async (req, res) => {
  
  try {
    const { employee_name, employee_ID, employee_email, gender, age, role } = req.body || {};
    if (
      !employee_name ||
      !employee_ID ||
      !employee_email ||
      !gender ||
      !age ||
      !role
    ) {
      console.log("Invalid Data:", {
        employee_name,
        employee_ID,
        employee_email,
        gender,
        age,
        role,
      });
      return res
        .status(400)
        .send({ message: "Invalid data. All fields are required." });
    }

    const newUser = new employee({
      employee_name,
      employee_ID,
      employee_email,
      gender,
      age,
      role,
      
    });
    const result = await newUser.save();
    return res.status(200).json({ message: "Stored successfully!" ,result});
 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server-side error" });
  }
};

module.exports = {
    employeeFormSubmit
}