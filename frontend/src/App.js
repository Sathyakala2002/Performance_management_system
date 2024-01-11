// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './screens/sidebar';
import Reviewform from './screens/reviewform';
import Dashboard from './screens/dashboard'

function App() {
  return (
    <Router>
      
      <Routes>

        <Route path="/" element={<Sidebar/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/forms" element={<Reviewform />} />
      </Routes>
    </Router>
  );
}

export default App;
