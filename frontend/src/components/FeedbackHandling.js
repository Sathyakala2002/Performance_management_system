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
import { setFeedbackHandlingFeedback } from '../features/feedbackSlice';

const FeedbackHandling = () => {
  const initialFeedbackState = {
    feedbackHandling: "",
    feedbackHandlingComment: "",
    feedbackHandlingRating: 0,
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
  const formattedFeedbackData = {
    feedbackHandling: {
      type: feedbackData.feedbackHandling || '',
      comment: feedbackData.feedbackHandlingComment || '',
      rating: feedbackData.feedbackHandlingRating || 0,
    },
  };
  useEffect(() => {
    // Dispatch the setfeedbackHandlingFeedback action to update Redux store
    dispatch(setFeedbackHandlingFeedback(formattedFeedbackData.feedbackHandling));
  }, [formattedFeedbackData, dispatch]);
  return (
    <div>
    <div className="p-10 mx-auto flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <form>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Handling feedback and criticism :</h2>
          <FormControl fullWidth margin="dense">
              <InputLabel required>Handling feedback and criticism:</InputLabel>
              <Select
                value={feedbackData.feedbackHandling}
                name="feedbackHandling"
                onChange={(e) => handleOnChange(e)}
                label="Handling feedback and criticism"
              >
                <MenuItem value="Very Positive">Very Positive</MenuItem>
                <MenuItem value="Accepts Feedback Well">
                  Accepts Feedback Well
                </MenuItem>
                <MenuItem value=" Struggles with Feedback">
                  Struggles with Feedback
                </MenuItem>
              </Select>
         
            </FormControl>
        </div>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Handling feedback Comment :</h2>
          <TextareaAutosize
            name="feedbackHandlingComment"
            value={feedbackData.feedbackHandlingComment}
            onChange={(e) => handleTextareaChange("feedbackHandlingComment", e.target.value)}
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
          <h2 className="text-2xl font-semibold mb-4">Handling feedback and criticism Rating :</h2>
          <FormControl fullWidth margin="dense">
            <Rating
              className="mt-3"
              name="feedbackHandlingRating"
              value={feedbackData.feedbackHandlingRating}
              onChange={(e) => handleRatingChange("feedbackHandlingRating", e.target.value)}
              size="large"
            />
          </FormControl>
        </div>
      </form>
    </div>
  </div>
  );
};

export default FeedbackHandling;
