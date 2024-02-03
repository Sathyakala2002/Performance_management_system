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
import { setCustomerInteractionsFeedback } from '../features/feedbackSlice';
const ClientInteractions = () => {
  const initialFeedbackState = {
    customerInteractions: "",
    customerInteractionsComment: "",
    customerInteractionsRating: 0,
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
    customerInteractions: {
      type: feedbackData.customerInteractions || '',
      comment: feedbackData.customerInteractionsComment || '',
      rating: feedbackData.customerInteractionsRating || 0,
    },
  };
  useEffect(() => {
    // Dispatch the setCustomerInteractionsFeedback action to update Redux store
    dispatch(setCustomerInteractionsFeedback(formattedFeedbackData.customerInteractions));
  }, [formattedFeedbackData, dispatch]);
  return (
    <div>
    <div className="p-10 mx-auto flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <form>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Handling client interactions:</h2>
          <FormControl fullWidth margin="dense">
              <InputLabel required>
                Handling customer or client interactions:
              </InputLabel>
              <Select
                value={feedbackData.customerInteractions}
                name="customerInteractions"
                onChange={(e) => handleOnChange(e)}
                label="Handling customer or client interactions"
              >
                <MenuItem value="Excellently Handles Interactions">
                  Excellently Handles Interactions
                </MenuItem>
                <MenuItem value="Adequately Handles Interactions">
                  Adequately Handles Interactions
                </MenuItem>
                <MenuItem value="Poorly Handles Interactions">
                  Poorly Handles Interactions
                </MenuItem>
              </Select>
            
            </FormControl>
        </div>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Handling client interactions Comment :</h2>
          <TextareaAutosize
            name="customerInteractionsComment"
            value={feedbackData.customerInteractionsComment}
            onChange={(e) => handleTextareaChange("customerInteractionsComment", e.target.value)}
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
          <h2 className="text-2xl font-semibold mb-4">Handling  client interactions Rating :</h2>
          <FormControl fullWidth margin="dense">
            <Rating
              className="mt-0"
              name="customerInteractionsRating"
              value={feedbackData.customerInteractionsRating}
              onChange={(e) => handleRatingChange("customerInteractionsRating", e.target.value)}
              size="large"
            />
          </FormControl>
        </div>
      </form>
    </div>
  </div>
  );
};

export default ClientInteractions;
