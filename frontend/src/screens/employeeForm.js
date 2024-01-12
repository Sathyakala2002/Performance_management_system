import React, { useState } from "react";
import {TextField,Button,MenuItem,FormControl,InputLabel,Box,Slider,Radio,RadioGroup,FormLabel,FormControlLabel,Rating,Select, } from "@mui/material";
import Sidebar from "./sidebar";
import axios from "axios";
import { useSnackbar } from "notistack";
import {useNavigate} from "react-router-dom"

const EmployeeForm = () => {

  const initialEmployeeState = {
    employee_name: "",
    employee_ID: "",
    employee_email: "",
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
    taskCompletion: "", // Adjusted for Step 2

  });

  const handleOnChange = (e) => {
    const { name, value} = e.target;
      setEmployeeData((prev) => ({
        ...prev,
        [name]: value,
      }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
      await axios
        .post("http://localhost:5000/employee", employeeData)
        .then((response) => {
          enqueueSnackbar(response.data.message, { variant: "success" });
          setEmployeeData(initialEmployeeState);
          navigate('/feedbakform')
        })
        .catch((error) => {
          console.error("Step 1 API error:", error);
        })
  };

  return (
    <div>
      <Sidebar />
      <div className="shadow-md p-8 md:w-96 w-fit mx-auto mt-12 flex items-center justify-center h-full">
        <form method="post" onSubmit={(e) => handleOnSubmit(e)}>
          <h1 className="text-center font-semibold text-blue-800 text-2xl">
            Employee Detials
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
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
