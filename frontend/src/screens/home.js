import React from 'react';
import Button from '@mui/material/Button';
import Sidebar from './sidebar';
import Formtable from './formTable';
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const handleEmployeeFormOpen = () => {
    navigate('/forms')
  };

  return (
    <div>
      <Sidebar />
      <div style={{ padding: '20px' ,margin:"30px 30px "}}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEmployeeFormOpen}
          style={{ float: 'right',marginTop:"30px" }}
        >
          Open Employee Form
        </Button>
        <Formtable />
      </div>
    </div>
  );
};

export default Home;
