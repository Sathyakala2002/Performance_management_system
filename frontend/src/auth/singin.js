import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
// import { useSnackbar } from "notistack";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const Signin = () => {
  // const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [loginData, setLoginData] = React.useState({
    employee_email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    employee_email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

//Validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (loginData.employee_email.trim() === "") {
      newErrors.employee_email = "email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.employee_email)) {
      newErrors.employee_email = "Invalid email format";
      isValid = false;
    }

    if (loginData.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
//Login data submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
console.log(loginData,"Submit");
    try {
      await axios
        .post("http://localhost:5000/loginuser", loginData)
        .then((response) => {
          const { token } = response.data || {};
          localStorage.setItem("token", token);
        });
      getLoggedIn();
      navigate("/table");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="  shadow-md p-10 w-96 mx-auto my-20 h-full flex items-center">
        <form onSubmit={handleOnSubmit}>
          <h1 className="text-center font-semibold text-blue-800 text-2xl py-5">
            Login
          </h1>
          <TextField
            margin="dense"
            label="Email"
            name="employee_email"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            error={!!errors.employee_email}
            helperText={errors.employee_email}
          />
          <TextField
            margin="dense"
            label="Password"
            onChange={handleChange}
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className="my-5 py-1">
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
          </div>
          
          <div className="my-1 py-1 flex px-2">
            <Typography color="primary" className="mt-1">
              Don't have an account?
            </Typography>
            <Button  color="primary" type="button" onClick={()=>navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
