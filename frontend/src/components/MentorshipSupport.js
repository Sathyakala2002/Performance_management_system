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
import { setMentorshipSupportFeedback } from '../features/feedbackSlice';
const MentorshipSupport = () => {
  const initialFeedbackState = {
    mentorshipSupport: "",
    mentorshipSupportComment: "",
    mentorshipSupportRating: 0,
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
    mentorshipSupport: {
      type: feedbackData.mentorshipSupport || "",
      comment: feedbackData.mentorshipSupportComment || "",
      rating: feedbackData.mentorshipSupportRating || 0,
    },
  };
  useEffect(() => {
    // Dispatch the setMeetingDeadlinesFeedback action to update Redux store
    dispatch(setMentorshipSupportFeedback(formattedFeedbackData.mentorshipSupport));
  }, [formattedFeedbackData, dispatch]);
  return (
    <div>
    <div className="p-10 mx-auto flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <form>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Mentorship or support for colleagues:</h2>
          <FormControl fullWidth margin="dense">
              <InputLabel required>
                Mentorship or support for colleagues:
              </InputLabel>
              <Select
                value={feedbackData.mentorshipSupport}
                name="mentorshipSupport"
                onChange={(e) => handleOnChange(e)}
                label="Mentorship or support for colleagues"
              >
                <MenuItem value="Provides Strong Mentorship/Support">
                  Provides Strong Mentorship/Support
                </MenuItem>
                <MenuItem value=" Offers Adequate Mentorship/Support">
                  Offers Adequate Mentorship/Support
                </MenuItem>
                <MenuItem value="Lacks Mentorship/Support Skills">
                  Lacks Mentorship/Support Skills
                </MenuItem>
              </Select>
             
            </FormControl>
        </div>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">mentorship for colleagues Comment :</h2>
          <TextareaAutosize
            name="mentorshipSupportComment"
            value={feedbackData.mentorshipSupportComment}
            onChange={(e) => handleTextareaChange("mentorshipSupportComment", e.target.value)}
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
          <h2 className="text-2xl font-semibold mb-4">mentorship for colleagues Rating :</h2>
          <FormControl fullWidth margin="dense">
            <Rating
              className="mt-0"
              name="mentorshipSupportRating"
              value={feedbackData.mentorshipSupportRating}
              onChange={(e) => handleRatingChange("mentorshipSupportRating", e.target.value)}
              size="large"
            />
          </FormControl>
        </div>
      </form>
    </div>
  </div>
  );
};

export default MentorshipSupport;
