import React, { useState, useContext } from "react";
import {TextField,Button,MenuItem,FormControl,InputLabel,Box,Slider,Radio,RadioGroup,FormLabel,FormControlLabel,Rating,Select, } from "@mui/material";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import { useSnackbar } from "notistack";
import {useNavigate} from "react-router-dom"
import AuthContext from "../context/AuthContext";


const SignUp = () => {
  const { getLoggedIn } = useContext(AuthContext);

  const initialEmployeeState = {
    employee_name: "",
    employee_ID: "",
    employee_email: "",
    password: "",
    gender: "",
    role: "",
    age: "",
  };

  const [employeeData, setEmployeeData] = useState(initialEmployeeState);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    age: "",
    taskCompletion: "", 
  });

  const handleOnChange = (e) => {
    const { name, value} = e.target;
      setEmployeeData((prev) => ({
        ...prev,
        [name]: value,
      }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/employee", employeeData)
      .then((response) => {
        const { token } = response.data || {};
        localStorage.setItem("token", token);
        
        setEmployeeData(initialEmployeeState);
        navigate('/signin')
        if (response.data.message) {
          console.log(response.data.message);
          enqueueSnackbar(response.data.message, { variant: "success" });
          getLoggedIn();
          // navigate("/signin");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          console.log(err.response.data.message);
        }
      });
  };

  return (
    <div>
      <div className="shadow-md p-8 md:w-96 w-fit mx-auto mt-12 flex items-center justify-center h-full">
        <form method="post" onSubmit={(e) => handleOnSubmit(e)}>
          <h1 className="text-center font-semibold text-blue-800 text-2xl">
            Sign up
          </h1>
            <>
              <TextField
                label="Employee Name"
                name="employee_name"
                value={employeeData.employee_name}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
                fullWidth
                error={errors.employee_name}
                helperText={errors.employee_name}
                margin="dense"
              />
              <TextField
                label="Employee ID"
                name="employee_ID"
                value={employeeData.employee_ID}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
                fullWidth
                error={errors.employee_ID}
                helperText={errors.employee_ID}
                margin="dense"
              />
              <TextField
                label="Employee Email"
                name="employee_email"
                type="email"
                value={employeeData.employee_email}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
                fullWidth
                error={errors.employee_email}
                helperText={errors.employee_email}
                margin="dense"
              />

              <TextField
                label="password"
                name="password"
                type="password"
                value={employeeData.password}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
                fullWidth
                error={errors.employee_email}
                helperText={errors.employee_email}
                margin="dense"
              />

              <FormControl fullWidth margin="dense">
                <InputLabel>Role</InputLabel>
                <Select
                  value={employeeData.role}
                  name="role"
                  onChange={(e) => handleOnChange(e)}
                  label="Role"
                  error={errors.role}
                >
                  <MenuItem value="Owner">Owner</MenuItem>
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
                {errors.role && (
                  <span style={{ color: "red", fontSize: "0.75rem" }}>
                    {errors.role}
                  </span>
                )}
              </FormControl>
              <TextField
                label="Age"
                type="number"
                name="age"
                value={employeeData.age}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
                fullWidth
                error={errors.age}
                helperText={errors.age}
                margin="dense"
              />
              <FormControl component="fieldset" margin="dense">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  name="gender"
                  value={employeeData.gender}
                  onChange={(e) => handleOnChange(e)}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </>
      
          <div className="my-5">
            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
