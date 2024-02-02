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
import { setInitiativeFeedback } from '../features/feedbackSlice';

const MeetingDeadlines = () => {
  const initialFeedbackState = {
    initiative: "",
    initiativeComment: "",
    initiativeRating: 0,
  };

  const { enqueueSnackbar } = useSnackbar();
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
      initiative: {
        type: feedbackData.initiative || "",
        comment: feedbackData.initiativeComment || "",
        rating: feedbackData.initiativeRating || 0,
      },
      // Add other properties as needed
    };

    useEffect(() => {
      // Dispatch the setMeetingDeadlinesFeedback action to update Redux store
      dispatch(setInitiativeFeedback(formattedFeedbackData.initiative));
    }, [formattedFeedbackData, dispatch])

  return (
    <div>
    <div className="p-10 mx-auto flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <form>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Initiative to new roles:</h2>
          <FormControl fullWidth margin="dense">
              <InputLabel required>Initiative to new roles:</InputLabel>
              <Select
                value={feedbackData.initiative}
                name="initiative"
                onChange={(e) => handleOnChange(e)}
                label="Initiative to new roles"
              >
                <MenuItem value="Highly Initiates to new roles">Highly Initiates to new roles</MenuItem>
                <MenuItem value="Initiates Occasionally">
                  Initiates Occasionally
                </MenuItem>
                <MenuItem value="Rarely Initiates">Rarely Initiates</MenuItem>
              </Select>
            </FormControl>
        </div>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Initiative Comment :</h2>
          <TextareaAutosize
            name="initiativeComment"
            value={feedbackData.initiativeComment}
            onChange={(e) => handleTextareaChange("initiativeComment", e.target.value)}
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
          <h2 className="text-2xl font-semibold mb-4">Initiative Rating :</h2>
          <FormControl fullWidth margin="dense">
            <Rating
              className="mt-3"
              name="initiativeRating"
              value={feedbackData.initiativeRating}
              onChange={(e) => handleRatingChange("initiativeRating", e.target.value)}
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
