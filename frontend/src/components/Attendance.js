import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { setAttendanceFeedback } from '../features/feedbackSlice';

const Attendance = () => {
  const dispatch = useDispatch();
  const [attendancePercentage, setAttendancePercentage] = useState(null);
  const [totalWorkingDays, setTotalWorkingDays] = useState("");
  const [daysPresent, setDaysPresent] = useState("");

  const handleCalculateAttendance = () => {
    const totalDays = parseInt(totalWorkingDays, 10);
    const presentDays = parseInt(daysPresent, 10);

    if (!isNaN(totalDays) && !isNaN(presentDays) && totalDays > 0 && presentDays >= 0) {
      const percentage = (presentDays / totalDays) * 100;
      setAttendancePercentage(percentage.toFixed(2));
    } else {
      setAttendancePercentage(null);
    }
  };
  const formattedFeedbackData = {
    attendancePercentage: {
    attendancePercentage
    },
  };
  useEffect(() => {
    // Dispatch the setMeetingDeadlinesFeedback action to update Redux store
    dispatch(setAttendanceFeedback(formattedFeedbackData.attendancePercentage));
  }, [formattedFeedbackData, dispatch]);

  return (
    <div className="p-10 mx-auto flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <form>
        <Box mt={3}>
          <Typography variant="h5">Attendance Calculator</Typography>
        </Box>
        <Box mt={2}>
          <TextField
            label="Total Working Days"
            type="number"
            value={totalWorkingDays}
            onChange={(e) => setTotalWorkingDays(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Days Present"
            type="number"
            value={daysPresent}
            onChange={(e) => setDaysPresent(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCalculateAttendance}
          >
            Calculate Attendance
          </Button>
        </Box>
        {attendancePercentage !== null && (
          <Box mt={2}>
            <Typography variant="h6">
              Attendance Percentage: {attendancePercentage}%
            </Typography>
          </Box>
        )}
      </form>
    </div>
  );
};

export default Attendance;
