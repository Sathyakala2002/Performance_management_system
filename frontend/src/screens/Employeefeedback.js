import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Button } from "@mui/material";
import axios from "axios";
import { Bar } from "../layout/m";
import html2pdf from "html2pdf.js";
import { Typography } from "@material-tailwind/react";
import { FormControl, Rating } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const generateTableSection = (header, tableContent) => (
  <div style={{ borderRight: "1px solid #ddd", padding: "10px" }}>
    <TableHead>
      <TableRow>
        <StyledTableCell>{header}</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody sx={{ minWidth: 900 }}>{tableContent}</TableBody>
  </div>
);

const feedbackQuestions = [
  "Is the employee open to learning and adapting to new tasks?",
  "How well does the employee collaborate with colleagues?",
  "How effectively does the employee communicate with others?",
  "How well does the employee handle customer or client interactions?",
  "Does the employee demonstrate ethical behavior in the workplace?",
  "How well does the employee handle feedback and criticism?",
  "Does the employee take initiative in their role?",
  "Is the employee able to meet tight deadlines?",
  "Is the employee a good mentor or supporter for their colleagues?",
  " Does the employee consistently complete tasks on time?",
  "Is the employee constantly following the login and logout timings",
];

const generateFeedbackSection = (question, type, comment, rating) => (
  <div style={{ borderRight: "1px solid #ddd", padding: "10px" }}>
    <TableHead>
      <TableRow>
        <StyledTableCell>{question}</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody sx={{ minWidth: 900 }}>
      {type && (
        <StyledTableRow key={`type`}>
          <StyledTableCell>{type}</StyledTableCell>
        </StyledTableRow>
      )}
      {comment && (
        <StyledTableRow key={`comment`}>
          <StyledTableCell>{comment}</StyledTableCell>
        </StyledTableRow>
      )}
      {rating && (
        <StyledTableRow key={`rating`}>
          <StyledTableCell>{rating}</StyledTableCell>
        </StyledTableRow>
      )}
    </TableBody>
  </div>
);

export default function CustomizedTables() {
  const [feedbackData, setFeedbackData] = useState({});
  const storedEmployeeID = localStorage.getItem("selectedEmployeeID");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getfeedback");
        const employeeData = response.data.db;
        const selectedEmployeeFeedback = employeeData.find(
          (data) => data.storedEmployeeID === storedEmployeeID
        );
        console.log(selectedEmployeeFeedback, "employeeeeeeeee");
        setFeedbackData(selectedEmployeeFeedback);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEmployeeData();
  }, [storedEmployeeID]);

  const attendance = feedbackData?.attendancePercentage || 0;
  const percentage = attendance?.attendancePercentage || 0;
  const employeeId = feedbackData?.storedEmployeeID ||null;

  const generatePDF = () => {
    const content = document.getElementById("pdf-content");
    html2pdf(content);
  };

  return (
    <div>
      <Bar />
      <div className="mt-10 mr-5 text-right">
        <Button
          type="button"
          variant="contained"
          color="primary"
          className="px-6 py-2 bg-blue-500  text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={generatePDF}
        >
          Generate PDF
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <Paper
          elevation={10}
          style={{ padding: "60px", margin: "10px" }}
          id="pdf-content"
        >
          <div className="m-6 flex justify-between">
            <Typography style={{ color: "black", fontWeight: "bold" }}>
              Attendance Percentage : {percentage}
            </Typography>
            <Typography style={{ color: "green", fontWeight: "bold" }}>
              Employee ID : {employeeId }
            </Typography>
          </div>
          <div className="flex">
            <div>
              {feedbackData ? (
                [...Array(11).keys()].map((index) => (
                  <TableContainer key={index} component={Paper} className="p-2">
                    {generateTableSection(index + 1, [
                      <StyledTableRow key="Feedback">
                        <StyledTableCell component="th" scope="row">
                          Feedback
                        </StyledTableCell>
                      </StyledTableRow>,
                      <StyledTableRow key="Comment">
                        <StyledTableCell component="th" scope="row">
                          Comment
                        </StyledTableCell>
                      </StyledTableRow>,
                      <StyledTableRow key="Rating">
                        <StyledTableCell component="th" scope="row">
                          Rating
                        </StyledTableCell>
                        ,
                      </StyledTableRow>,
                    ])}
                  </TableContainer>
                ))
              ) : (
                <h1>No data found</h1>
              )}
            </div>
            <div className="px-2">
              {feedbackData &&
                Object.keys(feedbackData).map(
                  (question, index) =>
                    question !== "storedEmployeeID" &&
                    question !== "attendancePercentage" && (
                      <div key={index}>
                        <TableContainer component={Paper} className="p-2">
                          {generateFeedbackSection(
                            question,
                            feedbackData[question]?.type,
                            feedbackData[question]?.comment,
                            <FormControl fullWidth>
                              <Rating
                                name="taskCompletionRating"
                                value={feedbackData[question]?.rating}
                                size="small"
                              />
                            </FormControl>
                          )}
                        </TableContainer>
                      </div>
                    )
                )}
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
