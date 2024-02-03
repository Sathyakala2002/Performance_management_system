import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Rating,
  Select,
  TextareaAutosize,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { setTaskCompletionFeedback } from '../features/feedbackSlice';


const TaskCompletion = () => {
  const initialFeedbackState = {
    taskCompletion: "",
    taskCompletionComment: "",
    taskCompletionRating: 0,
  };
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
    taskCompletion: {
      type: feedbackData.taskCompletion || '',
      comment: feedbackData.taskCompletionComment || '',
      rating: feedbackData.taskCompletionRating || 0,
    },
  };

  useEffect(() => {
    // Dispatch the setFeedbackData action to update Redux store
    dispatch(setTaskCompletionFeedback(formattedFeedbackData.taskCompletion));
  }, [formattedFeedbackData, dispatch]);


  return (
    <div>
    <div className="p-10 mx-auto flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <form>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Task Completion :</h2>
          <FormControl fullWidth margin="dense">
            <InputLabel required>Task Completion:</InputLabel>
            <Select
              value={feedbackData.taskCompletion}
              name="taskCompletion"
              onChange={(e) => handleOnChange(e)}
              label="Task Completion"
            >
              <MenuItem value="Always Completes Tasks on Time">
                Always Completes Tasks on Time
              </MenuItem>
              <MenuItem value="Often Completes Tasks on Time">
                Often Completes Tasks on Time
              </MenuItem>
              <MenuItem value="Rarely Completes Tasks on Time">Rarely Completes Tasks on Time :</MenuItem>
            </Select>
          </FormControl>
        </div>
  
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Task Completion Comment :</h2>
          <TextareaAutosize
            name="taskCompletionComment"
            value={feedbackData.taskCompletionComment}
            onChange={(e) => handleTextareaChange("taskCompletionComment", e.target.value)}
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
          <h2 className="text-2xl font-semibold mb-4">Task Completion Rating :</h2>
          <FormControl fullWidth margin="dense">
            <Rating
              className="mt-0"
              name="taskCompletionRating"
              value={feedbackData.taskCompletionRating}
              onChange={(e) => handleRatingChange("taskCompletionRating", e.target.value)}
              size="large"
            />
          </FormControl>
        </div>
      </form>
    </div>
  </div>
  );
};

export default TaskCompletion;
