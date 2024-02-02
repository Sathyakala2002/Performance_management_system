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
import { useDispatch } from "react-redux";
import { setAdaptingToNewTasksFeedback } from "../features/feedbackSlice";
const AdaptingNewTasks = () => {
  const initialFeedbackState = {
    adaptingToNewTasks: "",
    adaptingToNewTasksComment: "",
    adaptingToNewTasksRating: 0,
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
    adaptingToNewTasks: {
      type: feedbackData.adaptingToNewTasks || "",
      comment: feedbackData.adaptingToNewTasksComment || "",
      rating: feedbackData.adaptingToNewTasksRating || 0,
    },
  };
  useEffect(() => {
    dispatch(
      setAdaptingToNewTasksFeedback(formattedFeedbackData.adaptingToNewTasks)
    );
  }, [formattedFeedbackData, dispatch]);

  return (
    <div>
      <div
        className="p-10 mx-auto flex items-center justify-center"
        style={{ width: "100%", height: "100%" }}
      >
        <form>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Adapting to new tasks:
            </h2>
            <FormControl fullWidth margin="dense">
              <InputLabel required >
                Adapting to new tasks:
              </InputLabel>
              <Select
                value={feedbackData.adaptingToNewTasks}
                name="adaptingToNewTasks"
                onChange={(e) => handleOnChange(e)}
              >
                <MenuItem value="Highly Adapts">Highly Adapts</MenuItem>
                <MenuItem value="Moderately Adapts">Moderately Adapts</MenuItem>
                <MenuItem value="Struggles To Adapt">
                  Struggles to Adapt
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Adapting To New Tasks Comment:
            </h2>
            <TextareaAutosize
              name="adaptingToNewTasksComment"
              value={feedbackData.adaptingToNewTasksComment}
              onChange={(e) =>
                handleTextareaChange(
                  "adaptingToNewTasksComment",
                  e.target.value
                )
              }
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
            <h2 className="text-2xl font-semibold mb-4">
              Adapting To New Tasks Rating :
            </h2>
            <FormControl fullWidth margin="dense">
              <Rating
                className="mt-3"
                name="adaptingToNewTasksRating"
                value={feedbackData.adaptingToNewTasksRating}
                onChange={(e) =>
                  handleRatingChange("adaptingToNewTasksRating", e.target.value)
                }
                size="large"
              />
            </FormControl>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdaptingNewTasks;
