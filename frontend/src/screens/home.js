import React from 'react';
import Button from '@mui/material/Button';
import Sidebar from '../layout/Sidebar';
import {useNavigate} from 'react-router-dom';
import { Bar } from '../layout/m';

const Home = () => {
  const navigate = useNavigate();
  const handleEmployeeFormOpen = () => {
    navigate('/forms')
  };

  return (
    <div>
      <Bar/>
    </div>
  );
};

export default Home;
