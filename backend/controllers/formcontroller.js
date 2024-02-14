const employee = require("../models/employeeSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create token
const createToken = (user) => {
  // const expiresIn = '20m';

  return jwt.sign({ users: user }, process.env.JWT_SECRET);
};
// Get employees
const getUser = async (req, res) => {
  try {
    const db = await employee.find();

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

// Submit employee form  singup 
const employeeFormSubmit = async (req, res) => {
  try {
    const { employee_name, employee_ID, employee_email, password, gender, age, role } = req.body || {};

    if (!employee_name || !employee_ID || !employee_email || !gender || !age || !role) {
      return res.status(400).json({ message: "Invalid data. All fields are required." });
    }
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(password, salt);
   
    const newUser = new employee({ employee_name, employee_ID, employee_email, password: hashedpassword, gender, age, role });

   
    const result = await newUser.save();
    const token = createToken(newUser);
    
    return res.status(200).json({ message: "Stored successfully!", result , token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server-side error", error: error.message });
  }
};

// login user (POST /users)
const loginUser = async (req, res) => {
  try {
    const { employee_email, password } = req.body || {};
    
    if (!employee_email || !password) {
      return res.status(400).send({ message: "Required field is missing" });
    }

    const loginuser = await employee.findOne({ employee_email: employee_email }).lean();
    if (!loginuser) {
      return res.status(401).send({ message: "Invalid email or password!" });
    }

    try {
      const passwordcheck = await bcrypt.compare(password, loginuser.password); 
      console.log(loginuser.password, "login");

      if (!passwordcheck) {
        return res.status(401).send({ message: "Invalid email or password!" });
      }

      const token = createToken(loginuser);
      res.status(200).send({
        message: "Logged in successfully",
        loginuser,
        token,
      });
    } catch (bcryptError) {
      console.error("Error comparing passwords:", bcryptError);
      return res.status(400).send({ message: "Email or password is invalid" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};
 
//GET loggedin
const loggedIn = async (req, res) => {
  const userData = res.locals||{};
  // console.log(res.locals,"log");
  try {
    res
      .status(200)
      .json({ message: "Authorized person", foundUser: userData });
  } catch (error) {
    console.error(error);
    res.status(502).json({ message: "Server Error" });
  }
};
 


module.exports = { employeeFormSubmit, getUser,  loggedIn, loginUser };
