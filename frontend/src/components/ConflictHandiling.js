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
import { setConflictHandlingFeedback } from '../features/feedbackSlice';
const ConflictHandling = () => {
  const initialFeedbackState = {
    conflictHandling: "",
    conflictHandlingComment: "",
    conflictHandlingRating: 0,
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


  const fetchEmployeeData = async () => {
    // Your logic to fetch employee data
  };

  const formattedFeedbackData = {
    conflictHandling: {
      type: feedbackData.conflictHandling || "",
      comment: feedbackData.conflictHandlingComment || "",
      rating: feedbackData.conflictHandlingRating || 0,
    },
  };
  useEffect(() => {
    // Dispatch the setMeetingDeadlinesFeedback action to update Redux store
    dispatch(setConflictHandlingFeedback(formattedFeedbackData.conflictHandling));
  }, [formattedFeedbackData, dispatch]);
  return (
    <div>
    <div className="p-10 mx-auto flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <form>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Handling conflicts within the team:</h2>
          <FormControl fullWidth margin="dense">
              <InputLabel required>
                Handling conflicts within the team:
              </InputLabel>
              <Select
                value={feedbackData.conflictHandling}
                name="conflictHandling"
                onChange={(e) => handleOnChange(e)}
                label="Handling conflicts within the team"
              >
                <MenuItem value="Efficiently Handles Conflicts">
                  Efficiently Handles Conflicts
                </MenuItem>
                <MenuItem value="Fast Conflict Fixer">
                  Fast Conflict Fixer
                </MenuItem>
                <MenuItem value="Struggles with Conflicts">
                  Struggles with Conflicts
                </MenuItem>
              </Select>
    
            </FormControl>
        </div>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Handling conflict within team Comment:</h2>
          <TextareaAutosize
            name="conflictHandlingComment"
            value={feedbackData.conflictHandlingComment}
            onChange={(e) => handleTextareaChange("conflictHandlingComment", e.target.value)}
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
          <h2 className="text-2xl font-semibold mb-4">Handling conflicts within team Rating :</h2>
          <FormControl fullWidth margin="dense">
            <Rating
              className="mt-3"
              name="conflictHandlingRating"
              value={feedbackData.conflictHandlingRating}
              onChange={(e) => handleRatingChange("conflictHandlingRating", e.target.value)}
              size="large"
            />
          </FormControl>
        </div>
      </form>
    </div>
  </div>
  );
};

export default ConflictHandling;
