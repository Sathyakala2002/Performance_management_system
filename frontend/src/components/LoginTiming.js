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
import { setTimingKeepupFeedback } from '../features/feedbackSlice';

const TimingKeepup = () => {
  const initialFeedbackState = {
    timingKeepup: "",
    timingKeepupComment: "",
    timingKeepupRating: 0,
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
      timingKeepup: {
        type: feedbackData.timingKeepup || '',
        comment: feedbackData.timingKeepupComment || '',
        rating: feedbackData.timingKeepupRating || 0,
      },
    };
    useEffect(() => {
      // Dispatch the settimingKeepupFeedback action to update Redux store
      dispatch(setTimingKeepupFeedback(formattedFeedbackData.timingKeepup));
    }, [formattedFeedbackData, dispatch]);
  return (
    <div>
    <div className="p-10 mx-auto flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <form>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Timely Login and Logout Practices :</h2>
          <FormControl fullWidth margin="dense">
              <InputLabel required>
                Timely Login and Logout Practices:
              </InputLabel>
              <Select
                value={feedbackData.timingKeepup}
                name="timingKeepup"
                onChange={(e) => handleOnChange(e)}
                label="Timely Login and Logout Practices"
              >
                <MenuItem value="Consistently On Time">
                  Consistently On Time
                </MenuItem>
                <MenuItem value="Occasional Delays">Occasional Delays</MenuItem>
                <MenuItem value="Challenges with Punctuality">
                  Challenges with Punctuality
                </MenuItem>
              </Select>
            
            </FormControl>
        </div>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Login and Logout Practices Comment :</h2>
          <TextareaAutosize
            name="timingKeepupComment"
            value={feedbackData.timingKeepupComment}
            onChange={(e) => handleTextareaChange("timingKeepupComment", e.target.value)}
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
          <h2 className="text-2xl font-semibold mb-4">Login and Logout Practices Rating :</h2>
          <FormControl fullWidth margin="dense">
            <Rating
              className="mt-3"
              name="timingKeepupRating"
              value={feedbackData.timingKeepupRating}
              onChange={(e) => handleRatingChange("timingKeepupRating", e.target.value)}
              size="large"
            />
          </FormControl>
        </div>
      </form>
    </div>
  </div>
  );
};

export default TimingKeepup;