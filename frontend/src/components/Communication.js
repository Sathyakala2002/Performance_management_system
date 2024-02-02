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
import { setCommunicationSkillsFeedback } from '../features/feedbackSlice';

const CommunicationSkills = () => {
  const initialFeedbackState = {
    communicationSkills: "",
    communicationSkillsComment: "",
    communicationSkillsRating: 0,
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
      communicationSkills: {
        type: feedbackData.communicationSkills || '',
        comment: feedbackData.communicationSkillsComment || '',
        rating: feedbackData.communicationSkillsRating || 0,
      },
    };
    useEffect(() => {
      // Dispatch the setcommunicationSkillsFeedback action to update Redux store
      dispatch(setCommunicationSkillsFeedback(formattedFeedbackData.communicationSkills));
    }, [formattedFeedbackData, dispatch]);
    console.log(formattedFeedbackData,"communicationSkills");
  return (
    <div>
    <div className="p-10 mx-auto flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <form>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Communication Skills :</h2>
          <FormControl fullWidth margin="dense">
              <InputLabel required>
                Communication Skills
              </InputLabel>
              <Select
                value={feedbackData.communicationSkills}
                name="communicationSkills"
                onChange={(e) => handleOnChange(e)}
                label="Communication skills"
                  >
                <MenuItem value="Excellent">
                  Excellent
                </MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Need Improvement">
                  Need Improvement
                </MenuItem>
              </Select>
           
            </FormControl>
        </div>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Communication Skills Comment :</h2>
          <TextareaAutosize
            name="communicationSkillsComment"
            value={feedbackData.communicationSkillsComment}
            onChange={(e) => handleTextareaChange("communicationSkillsComment", e.target.value)}
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
          <h2 className="text-2xl font-semibold mb-4">Communication Skills Rating :</h2>
          <FormControl fullWidth margin="dense">
            <Rating
              className="mt-3"
              name="communicationSkillsRating"
              value={feedbackData.communicationSkillsRating}
              onChange={(e) => handleRatingChange("communicationSkillsRating", e.target.value)}
              size="large"
            />
          </FormControl>
        </div>
      </form>
    </div>
  </div>
  );
};

export default CommunicationSkills;