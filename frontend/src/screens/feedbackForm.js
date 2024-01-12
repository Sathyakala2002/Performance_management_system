import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Slider,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Rating,
  Select,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/system";
import Sidebar from "./sidebar";
import axios from "axios";
import { useSnackbar } from "notistack";
import {useNavigate} from "react-router-dom"

const FeedbackForm = () => {
  const marks = [
    {
      value: 20,
      label: "Need improvement",
    },
    {
      value: 50,
      label: "Good",
    },
    {
      value: 90,
      label: "Excellent",
    },
  ];

  function valuetext(value: number) {
    return `${value}`;
  }
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
  };

  const Textarea = styled(TextareaAutosize)(
    ({ theme }) => `
      width: 500px;
      font-family: 'IBM Plex Sans', sans-serif;
      border: 1px solid black;
      border-radius: 12px 12px 0 12px;
      padding: 12px;
      &:hover {
        border-color: ${
          theme.palette.mode === "dark" ? blue[400] : "hoverColor"
        };
      }
    `
  );
  const initialEmployeeFeedbackState = {
    taskCompletion: "",
    taskCompletionComment: "",
    meetingDeadlines: "",
    meetingDeadlinesComment: "",
    initiative: "",
    initiativeComment: "",
    collaboration: "",
    collaborationComment: "",
    adaptingToNewTasks: "",
    adaptingToNewTasksComment: "",
    conflictHandling: "",
    conflictHandlingcomment: "",
    mentorshipSupport: "",
    mentorshipSupportComment: "",
    ethicalBehavior: "",
    ethicalBehaviorComment: "",
    customerInteractions: "",
    customerInteractionsComment: "",
    feedbackHandling: "",
    communicationSkills: "",
  };

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState(
    initialEmployeeFeedbackState
  );
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    age: "",
    taskCompletion: "", // Adjusted for Step 2
  });

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setFeedbackData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

const handleOnChange=(e) => {
    setFeedbackData({
        ...feedbackData,
        [e.target.name]: e.target.value,

    })};

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/feedback", feedbackData)
      .then((response) => {
        enqueueSnackbar(response.data.message, { variant: "success" });
        console.log("Form submitted:", feedbackData);
        setFeedbackData(initialEmployeeFeedbackState);
        navigate('/table')
      })
      .catch((error) => {
        console.error("Step 2 API error:", error);
      });
  };

  return (
    <div>
      <Sidebar />
      <div
        className="shadow-md p-8 md:w-96 w-fit mx-auto mt-12 flex items-center justify-center"
        style={{ width: "50%", height: "80%" }}
      >
        <form method="post" onSubmit={(e) => handleOnSubmit(e)}>
          <h1 className="text-center font-semibold text-blue-800 text-2xl">
            Feedback Form
          </h1>
          <>
            <h2>Technical performance</h2>
            <FormControl fullWidth margin="dense">
              <InputLabel required>Task Completion:</InputLabel>
              <Select
                value={feedbackData.taskCompletion}
                name="taskCompletion"
                onChange={(e) => handleOnChange(e)}
                label="Task Completion"
                error={errors.taskCompletion}
              >
                <MenuItem value="better">
                  Always Completes Tasks on Time
                </MenuItem>
                <MenuItem value="moderate">
                  Often Completes Tasks on Time
                </MenuItem>
                <MenuItem value="poor">Rarely Completes Tasks on Time</MenuItem>
              </Select>
              {errors.taskCompletion && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.taskCompletion}
                </span>
              )}
            </FormControl>
            <Textarea
  aria-label="empty textarea"
  placeholder="Comments"
  className="m-4"
  onChange={(e) => handleOnChange(e, "taskCompletionComment")}
  value={feedbackData.taskCompletionComment}
/>

            <FormControl fullWidth margin="dense">
              <InputLabel required>Meeting Deadlines:</InputLabel>
              <Select
                value={feedbackData.meetingDeadlines}
                name="meetingDeadlines"
                onChange={(e) => handleOnChange(e)}
                label="Meeting Deadlines"
                error={errors.meetingDeadlines}
              >
                <MenuItem value="alwaysMeets">Always Meets Deadlines</MenuItem>
                <MenuItem value="oftenMeets">Often Meets Deadlines</MenuItem>
                <MenuItem value="frequentlyMisses">
                  Frequently Misses Deadlines
                </MenuItem>
              </Select>
              {errors.meetingDeadlines && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.meetingDeadlines}
                </span>
              )}
            </FormControl>
            <Textarea
              aria-label="empty textarea"
              placeholder="Comments"
              className="m-4"
              onChange={(e) => handleOnChange(e, "meetingDeadlines")}
              value={feedbackData.meetingDeadlines}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel required>Initiative to new roles:</InputLabel>
              <Select
                value={feedbackData.initiative}
                name="initiative"
                onChange={(e) => handleOnChange(e)}
                label="Initiative to new roles"
                error={errors.initiative}
              >
                <MenuItem value="highlyInitiates">Highly Initiates</MenuItem>
                <MenuItem value="initiatesOccasionally">
                  Initiates Occasionally
                </MenuItem>
                <MenuItem value="rarelyInitiates">Rarely Initiates</MenuItem>
              </Select>
              {errors.initiative && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.initiative}
                </span>
              )}
            </FormControl>
            <Textarea
              aria-label="empty textarea"
              placeholder="Comments"
              className="m-4"
              onChange={(e) => handleOnChange(e, "initiative")}
              value={feedbackData.initiative}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel required>Collaboration with team members:</InputLabel>
              <Select
                value={feedbackData.collaboration}
                name="collaboration"
                onChange={(e) => handleOnChange(e)}
                label="Collaboration with team members"
                error={errors.collaboration}
              >
                <MenuItem value="excellentCollaboration">
                  Excellent Collaboration
                </MenuItem>
                <MenuItem value="collaboratesEffectively">
                  Collaborates Effectively
                </MenuItem>
                <MenuItem value="limitedCollaboration">
                  Limited Collaboration
                </MenuItem>
              </Select>
              {errors.collaboration && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.collaboration}
                </span>
              )}
            </FormControl>
            <Textarea
              aria-label="empty textarea"
              placeholder="Comments"
              className="m-4"
              onChange={(e) => handleOnChange(e, "collaboration")}
              value={feedbackData.collaboration}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel required className="mb-8 pl-5">
                Adapting to new tasks:
              </InputLabel>
              <Rating
                className="mt-9"
                name="adaptingToNewTasks"
                value={feedbackData.adaptingToNewTasks}
                onChange={(e) => handleOnChange(e)}
                error={errors.adaptingToNewTasks}
                size="large"
              />
              {errors.adaptingToNewTasks && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.adaptingToNewTasks}
                </span>
              )}
            </FormControl>
            <Textarea
              aria-label="empty textarea"
              placeholder="Comments"
              className="m-4"
              onChange={(e) => handleOnChange(e, "adaptingToNewTasks")}
              value={feedbackData.adaptingToNewTasks}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel required>
                Handling conflicts within the team:
              </InputLabel>
              <Select
                value={feedbackData.conflictHandling}
                name="conflictHandling"
                onChange={(e) => handleOnChange(e)}
                label="Handling conflicts within the team"
                error={errors.conflictHandling}
              >
                <MenuItem value="efficientlyHandlesConflicts">
                  Efficiently Handles Conflicts
                </MenuItem>
                <MenuItem value="fastConflictFixer">
                  Fast Conflict Fixer
                </MenuItem>
                <MenuItem value="strugglesWithConflicts">
                  Struggles with Conflicts
                </MenuItem>
              </Select>
              {errors.conflictHandling && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.conflictHandling}
                </span>
              )}
            </FormControl>
            <Textarea
              aria-label="empty textarea"
              placeholder="Comments"
              className="m-4"
              onChange={(e) => handleOnChange(e, "conflictHandling")}
              value={feedbackData.conflictHandling}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel required>
                Mentorship or support for colleagues:
              </InputLabel>
              <Select
                value={feedbackData.mentorshipSupport}
                name="mentorshipSupport"
                onChange={(e) => handleOnChange(e)}
                label="Mentorship or support for colleagues"
                error={errors.mentorshipSupport}
              >
                <MenuItem value="providesStrongMentorshipSupport">
                  Provides Strong Mentorship/Support
                </MenuItem>
                <MenuItem value="offersAdequateMentorshipSupport">
                  Offers Adequate Mentorship/Support
                </MenuItem>
                <MenuItem value="lacksMentorshipSupportSkills">
                  Lacks Mentorship/Support Skills
                </MenuItem>
              </Select>
              {errors.mentorshipSupport && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.mentorshipSupport}
                </span>
              )}
            </FormControl>
            <Textarea
              aria-label="empty textarea"
              placeholder="Comments"
              className="m-4"
              onChange={(e) => handleOnChange(e, "mentorshipSupport")}
              value={feedbackData.mentorshipSupport}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel required>
                Ethical behavior in the workplace:
              </InputLabel>
              <Select
                value={feedbackData.ethicalBehavior}
                name="ethicalBehavior"
                onChange={(e) => handleOnChange(e)}
                label="Ethical behavior in the workplace"
                error={errors.ethicalBehavior}
              >
                <MenuItem value="demonstratesHighEthicalStandards">
                  Demonstrates High Ethical Standards
                </MenuItem>
                <MenuItem value="generallyUpholdsEthicalStandards">
                  Generally Upholds Ethical Standards
                </MenuItem>
                <MenuItem value="demonstratesUnethicalBehavior">
                  Demonstrates Unethical Behavior
                </MenuItem>
              </Select>
              {errors.ethicalBehavior && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.ethicalBehavior}
                </span>
              )}
            </FormControl>
            <Textarea
              aria-label="empty textarea"
              placeholder="Comments"
              className="m-4"
              onChange={(e) => handleOnChange(e, "ethicalBehavior")}
              value={feedbackData.ethicalBehavior}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel required>
                Handling customer or client interactions:
              </InputLabel>
              <Select
                value={feedbackData.customerInteractions}
                name="customerInteractions"
                onChange={(e) => handleOnChange(e)}
                label="Handling customer or client interactions"
                error={errors.customerInteractions}
              >
                <MenuItem value="excellentlyHandlesInteractions">
                  Excellently Handles Interactions
                </MenuItem>
                <MenuItem value="adequatelyHandlesInteractions">
                  Adequately Handles Interactions
                </MenuItem>
                <MenuItem value="poorlyHandlesInteractions">
                  Poorly Handles Interactions
                </MenuItem>
              </Select>
              {errors.customerInteractions && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.customerInteractions}
                </span>
              )}
            </FormControl>
            <Textarea
              aria-label="empty textarea"
              placeholder="Comments"
              className="m-4"
              onChange={(e) => handleOnChange(e, "customerInteractions")}
              value={feedbackData.customerInteractions}
            />

            <FormControl fullWidth margin="dense">
              <InputLabel required>Handling feedback and criticism:</InputLabel>
              <Select
                value={feedbackData.feedbackHandling}
                name="feedbackHandling"
                onChange={(e) => handleOnChange(e)}
                label="Handling feedback and criticism"
                error={errors.feedbackHandling}
              >
                <MenuItem value="veryPositive">Very Positive</MenuItem>
                <MenuItem value="acceptsFeedbackWell">
                  Accepts Feedback Well
                </MenuItem>
                <MenuItem value="strugglesWithFeedback">
                  Struggles with Feedback
                </MenuItem>
              </Select>
              {errors.feedbackHandling && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.feedbackHandling}
                </span>
              )}
            </FormControl>
            <Textarea
              aria-label="empty textarea"
              placeholder="Comments"
              className="m-4"
              onChange={(e) => handleOnChange(e, "feedbackHandling")}
              value={feedbackData.feedbackHandling}
            />

            <Box sx={{ width: 300 }}>
              <h2>Communication Skills</h2>
              <Slider
                aria-label="Communication Skills"
                defaultValue={feedbackData.communicationSkills}
                getAriaValueText={valuetext}
                step={10}
                marks={marks}
                valueLabelDisplay="on"
                onChange={(e, value) =>
                  handleOnChange({
                    target: { name: "communicationSkills", value },
                  })
                }
              />
            </Box>
            {/* <Textarea aria-label="empty textarea" placeholder="Comments" className="m-4" onChange={(e) => handleOnChange(e, "mentorshipSupport")}/> */}
          </>

          <div className="my-5">
            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
