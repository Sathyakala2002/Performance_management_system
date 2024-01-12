import React, { useState, useEffect,useRef, useMemo} from 'react';
import Sidebar from './sidebar';
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { useSnackbar } from "notistack";
import FeedbackIcon from '@mui/icons-material/Feedback';
import IconButton from "@mui/material/IconButton";

const Formtable = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();
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
    { field: "Feedback", headerName: "Feedback", cellRenderer: feedbackRenderer },
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   cellRenderer: deleteRenderer,
    // }
  ];
  function feedbackRenderer(params) {
    return (
      <div>
        <IconButton
          aria-label="delete"
          className="p-3"
          color="primary"
          onClick={() => handleClickOpen(params.data, params.index)}
        >
          <FeedbackIcon />
        </IconButton>
      </div>
    );
  }

  const handleClickOpen = (data, index) =>{
    
  }
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getemplyee'); 
        if (!response) {
          console.log('Network response was not ok');
        }
        const data = await response.json();
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
    <div className="ag-theme-alpine" style={{ height: '200vh', width: '100%', margin:'80px'}}>
      <Sidebar />
      <AgGridReact
      
          ref={gridRef} 
          rowData={rowData}
          columnDefs={columnDefs} 
          defaultColDef={defaultColDef} 
          animateRows={true} 
          rowSelection="multiple" 
        />
    </div>
  );
};
 
export default Formtable;