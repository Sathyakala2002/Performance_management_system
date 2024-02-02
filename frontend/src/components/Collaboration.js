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
import { setCollaborationFeedback } from '../features/feedbackSlice';

const Collaboration = () => {
  const initialFeedbackState = {
    collaboration: "",
    collaborationComment: "",
    collaborationRating: 0,
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
      collaboration: {
        type: feedbackData.collaboration || "",
        comment: feedbackData.collaborationComment || "",
        rating: feedbackData.collaborationRating || 0,
      },
    };
    useEffect(() => {
      // Dispatch the setMeetingDeadlinesFeedback action to update Redux store
      dispatch(setCollaborationFeedback(formattedFeedbackData.collaboration));
    }, [formattedFeedbackData, dispatch]);
  return (
    <div>
    <div className="p-10 mx-auto flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <form>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Collaboration :</h2>
          <FormControl fullWidth margin="dense">
          <InputLabel required>
                Collaboration :
              </InputLabel>
              <Select
                value={feedbackData.collaboration}
                name="collaboration"
                onChange={(e) => handleOnChange(e)}
                label="collaboration to new roles"
              >
                 <MenuItem value="Excellent Collaboration">
                  Excellent Collaboration
                </MenuItem>
                <MenuItem value="Collaborates Effectively">
                  Collaborates Effectively
                </MenuItem>
                <MenuItem value="Limited Collaboration">
                  Limited Collaboration
                </MenuItem>
              </Select>
            </FormControl>
        </div>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Collaboration Comment :</h2>
          <TextareaAutosize
            name="collaborationComment"
            value={feedbackData.collaborationComment}
            onChange={(e) => handleTextareaChange("collaborationComment", e.target.value)}
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
          <h2 className="text-2xl font-semibold mb-4">Collaboration Rating :</h2>
          <FormControl fullWidth margin="dense">
            <Rating
              className="mt-3"
              name="collaborationRating"
              value={feedbackData.collaborationRating}
              onChange={(e) => handleRatingChange("collaborationRating", e.target.value)}
              size="large"
            />
          </FormControl>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Collaboration;
