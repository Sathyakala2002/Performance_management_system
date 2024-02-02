import React, { useState, useEffect,useRef, useMemo} from 'react';
import Sidebar from '../layout/Sidebar';
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { useSnackbar } from "notistack";
import FeedbackIcon from '@mui/icons-material/Feedback';
import IconButton from "@mui/material/IconButton";
import FeedIcon from '@mui/icons-material/Feed';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate } from "react-router-dom"
import { red } from '@mui/material/colors';
import  axios  from 'axios';
import { Bar } from '../layout/m';

const Formtable = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [rowData, setRowData] = useState([]);
  const [disable,setDisable] = useState(false);
  const gridRef = useRef();
  const navigate =useNavigate();
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );
 
  
  const columnDefs = [
    { headerName: 'Employee ID', field: 'employee_ID' },
    { headerName: 'Employee Name', field: 'employee_name' },
    { headerName: 'Employee Email', field: 'employee_email' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Employee Role', field: 'role' },
    { headerName: 'Give feedback', field: 'Give Feedback',cellRenderer:giveFeedbackRenderer },
    { field: "Feedback", headerName: "Feedback", cellRenderer: feedbackRenderer },
    { field: "Delete", headerName: "Delete", cellRenderer: deleteRenderer }

  ];
  function feedbackRenderer(params) {
    return (
      <div>
        <IconButton
          aria-label="delete"
          className="p-3"
          color="primary"
          onClick={() => handleClickFeedbackViewOpen(params.data, params.rowIndex)}
        >
          <FeedbackIcon />
        </IconButton>
      </div>
    );
  }
  function giveFeedbackRenderer(params) {
    return (
      <div>
        <IconButton
          aria-label="delete"
          className="p-3"
          color="primary"
          onClick={() => handleGiveFeedbackCickOpen(params.data, params.rowIndex)}
          disabled={disable}
        >
          <FeedIcon />
        </IconButton>
      </div>
    );
  }
  
  function deleteRenderer(params) {
    return (
      <div>
        <IconButton
          aria-label="delete"
          className="p-3"
          sx={{ color: red[500] }} 
          onClick={() => handleDelete(params.data, params.rowIndex)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }

  const handleClickFeedbackViewOpen = (data, index) => {
    const employeeID = data.employee_ID;
    localStorage.setItem("selectedEmployeeID", employeeID);
    navigate('/feedbackDetails');
  };
  
  const handleGiveFeedbackCickOpen = (data, index) => {
    const employeeID = data.employee_ID;
    localStorage.setItem("selectedEmployeeID", employeeID);
    navigate('/feedbackform')
    // setDisable(true);
  };
  
  const handleDelete =()=>{

  }
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getemplyee');
        const data = response.data;
        console.log(data);
        enqueueSnackbar(data.message, { variant: "success" });
        setRowData(data.db);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    };
  
    fetchData();
  }, []);
  return (
    <div>
      <Bar/>
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%', margin:'100px 0px 0px 350px'}}>
      
      <AgGridReact
          ref={gridRef} 
          rowData={rowData}
          columnDefs={columnDefs} 
          defaultColDef={defaultColDef} 
          animateRows={true} 
          rowSelection="multiple" 
        />
    </div>
    </div>
  );
};
 
export default Formtable;