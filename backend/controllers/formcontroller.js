const employee = require("../models/employeeSchema");

// Get employees
const getUser = async (req, res) => {
  try {
    const db = await employee.find();
    console.log(db);

    if (db.length > 0) {
      return res.status(200).json({ message: "Data fetched successfully", db });
    } else {
      return res.status(404).json({ message: "No data found in the DB" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Submit employee form
const employeeFormSubmit = async (req, res) => {
  try {
    const { employee_name, employee_ID, employee_email, gender, age, role } = req.body || {};

    if (!employee_name || !employee_ID || !employee_email || !gender || !age || !role) {
      console.log("Invalid Data:", { employee_name, employee_ID, employee_email, gender, age, role });
      return res.status(400).json({ message: "Invalid data. All fields are required." });
    }

    const newUser = new employee({ employee_name, employee_ID, employee_email, gender, age, role });
    const result = await newUser.save();
    return res.status(200).json({ message: "Stored successfully!", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server-side error", error: error.message });
  }
};

module.exports = { employeeFormSubmit, getUser };
