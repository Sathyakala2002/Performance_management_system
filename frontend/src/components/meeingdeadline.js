import React, { useState, useEffect } from "react";
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Rating,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "../layout/m";
import { useDispatch } from 'react-redux';
import { setMeetingDeadlinesFeedback } from '../features/feedbackSlice';

const MeetingDeadlines = () => {
  const initialFeedbackState = {
    meetingDeadlines: "",
    meetingDeadlinesComment: "",
    meetingDeadlinesRating: 0,
  };

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [feedbackData, setFeedbackData] = useState(initialFeedbackState);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFeedbackData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextareaChange = (name, value) => {
    setFeedbackData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRatingChange = (name, value) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    // Structure feedbackData based on the schema
    const formattedFeedbackData = {
      meetingDeadlines: {
        type: feedbackData.meetingDeadlines || '',
        comment: feedbackData.meetingDeadlinesComment || '',
        rating: feedbackData.meetingDeadlinesRating || 0,
      },
    };
    useEffect(() => {
      // Dispatch the setMeetingDeadlinesFeedback action to update Redux store
      dispatch(setMeetingDeadlinesFeedback(formattedFeedbackData.meetingDeadlines));
    }, [formattedFeedbackData, dispatch]);
  return (
    <div>
    <div className="p-10 mx-auto flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <form>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Meeting Deadlines:</h2>
          <FormControl fullWidth margin="dense">
              <InputLabel required>Meeting Deadlines:</InputLabel>
              <Select
                value={feedbackData.meetingDeadlines}
                name="meetingDeadlines"
                onChange={(e) => handleOnChange(e)}
                label="Meeting Deadlines"
              >
                <MenuItem value="Always Meets Deadlines">Always Meets Deadlines</MenuItem>
                <MenuItem value="Often Meets Deadlines">Often Meets Deadlines</MenuItem>
                <MenuItem value="Frequently Misses Deadlines">
                  Frequently Misses Deadlines
                </MenuItem>
              </Select>
             
            </FormControl>
        </div>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Meeting Deadline Comment :</h2>
          <TextareaAutosize
            name="meetingDeadlinesComment"
            value={feedbackData.meetingDeadlinesComment}
            onChange={(e) => handleTextareaChange("meetingDeadlinesComment", e.target.value)}
            placeholder="Comment"
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />  

        </div>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Meeting Deadline Rating :</h2>
          <FormControl fullWidth margin="dense">
            <Rating
              className="mt-3"
              name="meetingDeadlinesRating"
              value={feedbackData.meetingDeadlinesRating}
              onChange={(e) => handleRatingChange("meetingDeadlinesRating", e.target.value)}
              size="large"
            />
          </FormControl>
        </div>
      </form>
    </div>
  </div>
  );
};

export default MeetingDeadlines;
