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
import { setEthicalBehaviorFeedback } from '../features/feedbackSlice';
const EthicalBehavior = () => {
  const initialFeedbackState = {
    ethicalBehavior: "",
    ethicalBehaviorComment: "",
    ethicalBehaviorRating: 0,
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
    ethicalBehavior: {
      type: feedbackData.ethicalBehavior || "",
      comment: feedbackData.ethicalBehaviorComment || "",
      rating: feedbackData.ethicalBehaviorRating || 0,
    },
  };
  useEffect(() => {
    // Dispatch the setMeetingDeadlinesFeedback action to update Redux store
    dispatch(setEthicalBehaviorFeedback(formattedFeedbackData.ethicalBehavior));
  }, [formattedFeedbackData, dispatch]);
  return (
    <div>
    <div className="p-10 mx-auto flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <form>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Ethical behavior in the workplace:</h2>
          <FormControl fullWidth margin="dense">
              <InputLabel required>
                Ethical behavior in the workplace:
              </InputLabel>
              <Select
                value={feedbackData.ethicalBehavior}
                name="ethicalBehavior"
                onChange={(e) => handleOnChange(e)}
                label="Ethical behavior in the workplace"
              >
                <MenuItem value="Demonstrates High Ethical Standards">
                  Demonstrates High Ethical Standards
                </MenuItem>
                <MenuItem value="generallyUpholdsEthicalStandards">
                  Generally Upholds Ethical Standards
                </MenuItem>
                <MenuItem value="Demonstrates Unethical Behavior">
                  Demonstrates Unethical Behavior
                </MenuItem>
              </Select>
        
            </FormControl>
        </div>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Ethical behavior Comment :</h2>
          <TextareaAutosize
            name="ethicalBehaviorComment"
            value={feedbackData.ethicalBehaviorComment}
            onChange={(e) => handleTextareaChange("ethicalBehaviorComment", e.target.value)}
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
          <h2 className="text-2xl font-semibold mb-4">Ethical behavior Rating :</h2>
          <FormControl fullWidth margin="dense">
            <Rating
              className="mt-0"
              name="ethicalBehaviorRating"
              value={feedbackData.ethicalBehaviorRating}
              onChange={(e) => handleRatingChange("ethicalBehaviorRating", e.target.value)}
              size="large"
            />
          </FormControl>
        </div>
      </form>
    </div>
  </div>
  );
};

export default EthicalBehavior;
