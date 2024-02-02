// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import EmployeeForm from './screens/employeeForm';
import Formtable from './screens/employeeTable'
import PageDisplay from './Formpages'
import FeedbackForm from './screens/Employeefeedback'
import Home from './screens/home'
import Navbar from './layout/navbar'
import SignIn from './auth/singin';
import SignUp from './auth/signup';
import { Bar } from './layout/m';
import AuthContext from "./context/AuthContext";


function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
      {loggedIn === false && (
        <>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        </>
        )}

         {/* <Route path="/" element={<S />} /> */}
        {loggedIn === true && (
          <>
          <Route path="/home" element={<Home />} />
          <Route path="/navbar" element={<Navbar />} />
          {/* <Route path="/forms" element={<EmployeeForm />} /> */}
          <Route path="/feedbackform" element={<PageDisplay />} />
          <Route path="/table" element={<Formtable />} />
          <Route path="/feedbackDetails" element={<FeedbackForm />} />
          </>
          )}  
      </Routes>
    </Router>
  );
}

export default App;
