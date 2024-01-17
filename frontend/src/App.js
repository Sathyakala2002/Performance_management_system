// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './screens/sidebar';
import EmployeeForm from './screens/employeeForm';
import Dashboard from './screens/dashboard'
import Formtable from './screens/formTable'
import FeedbackForm from './screens/feedbackForm'
import FeedbackDetails from './screens/feedbackDetails'
import Home from './screens/home'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/forms" element={<EmployeeForm />} />
        <Route path="/feedbackform" element={<FeedbackForm />} />
        <Route path="/table" element={<Formtable />} />
        <Route path="/feedbackDetails" element={<FeedbackDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
