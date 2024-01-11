import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Sidebar from "./sidebar";
import axios from "axios";

const Reviewform = () => {
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
      width: 400px;
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
  const initialEmployeeState = {
    employee_name: "",
    employee_ID: "",
    employee_email: "",
    gender: "",
    role: "",
    age: "",
  };

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

  const initialCommentsState = {
    taskCompletionComment: "",
    meetingDeadlinesComment: "",
    initiativeComment: "",
    collaborationComment: "",
    adaptingToNewTasksComment: "",
    conflictHandlingcomment: "",
    mentorshipSupportComment: "",
    ethicalBehaviorComment: "",
    customerInteractionsComment: "",
    feedbackHandlingComment: "",
  };

  const [employeeData, setEmployeeData] = useState(initialEmployeeState);
  const [feedbackData, setFeedbackData] = useState(
    initialEmployeeFeedbackState
  );
  const [comments, setComments] = useState(initialCommentsState);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    age: "",
    taskCompletion: "", // Adjusted for Step 2
    // Add other error states for Step 2 based on your form
  });

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;

    if (step === 1) {
      setEmployeeData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (step === 2) {
      setFeedbackData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };
console.log(comments);
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      await axios
        .post("http://localhost:5000/employee", employeeData)
        .then((response) => {
          console.log("Step 1 API response:", response);
          setEmployeeData(initialEmployeeState);
          setStep(2);
        })
        .catch((error) => {
          console.error("Step 1 API error:", error);
        });
    } else if (step === 2) {
      await axios
        .post("http://localhost:5000/feedback", feedbackData)
        .then((response) => {
          console.log("Step 2 API response:", response);
          // You can handle the response as needed
          console.log("Form submitted:", employeeData, feedbackData);
          setFeedbackData(initialEmployeeFeedbackState);
          setStep(1);
        })
        .catch((error) => {
          console.error("Step 2 API error:", error);
        });
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="shadow-md p-5 md:w-96 w-fit mx-auto mt-12 flex items-center justify-center h-full">
        <form method="post" onSubmit={(e) => handleOnSubmit(e)}>
          <h1 className="text-center font-semibold text-blue-800 text-2xl">
            Employee Detials
          </h1>
          {step === 1 && (
            <>
              <TextField
                label="Employee Name"
                name="employee_name"
                value={employeeData.employee_name}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
                fullWidth
                error={errors.employee_name}
                helperText={errors.employee_name}
                margin="dense"
              />
              <TextField
                label="Employee ID"
                name="employee_ID"
                value={employeeData.employee_ID}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
                fullWidth
                error={errors.employee_ID}
                helperText={errors.employee_ID}
                margin="dense"
              />
              <TextField
                label="Employee Email"
                name="employee_email"
                type="email"
                value={employeeData.employee_email}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
                fullWidth
                error={errors.employee_email}
                helperText={errors.employee_email}
                margin="dense"
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Role</InputLabel>
                <Select
                  value={employeeData.role}
                  name="role"
                  onChange={(e) => handleOnChange(e)}
                  label="Role"
                  error={errors.role}
                >
                  <MenuItem value="Owner">Owner</MenuItem>
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
                {errors.role && (
                  <span style={{ color: "red", fontSize: "0.75rem" }}>
                    {errors.role}
                  </span>
                )}
              </FormControl>
              <TextField
                label="Age"
                type="number"
                name="age"
                value={employeeData.age}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
                fullWidth
                error={errors.age}
                helperText={errors.age}
                margin="dense"
              />
              <FormControl component="fieldset" margin="dense">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  name="gender"
                  value={employeeData.gender}
                  onChange={(e) => handleOnChange(e)}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Technical performance</h2>

              <FormControl fullWidth margin="dense">
                <InputLabel required>Task Completion:</InputLabel>
                <Select
                  value={employeeData.taskCompletion}
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
                  <MenuItem value="poor">
                    Rarely Completes Tasks on Time
                  </MenuItem>
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
                onChange={(e) => handleCommentChange(e, "taskCompletion")}
                value={comments.taskCompletionComment}
              />

              <FormControl fullWidth margin="dense">
                <InputLabel required>Meeting Deadlines:</InputLabel>
                <Select
                  value={employeeData.meetingDeadlines}
                  name="meetingDeadlines"
                  onChange={(e) => handleOnChange(e)}
                  label="Meeting Deadlines"
                  error={errors.meetingDeadlines}
                >
                  <MenuItem value="alwaysMeets">
                    Always Meets Deadlines
                  </MenuItem>
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
                onChange={(e) => handleCommentChange(e, "meetingDeadlines")}
                value={comments.meetingDeadlines}
              />

              <FormControl fullWidth margin="dense">
                <InputLabel required>Initiative to new roles:</InputLabel>
                <Select
                  value={employeeData.initiative}
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
                onChange={(e) => handleCommentChange(e, "initiative")}
                value={comments.initiative}
              />

              <FormControl fullWidth margin="dense">
                <InputLabel required>
                  Collaboration with team members:
                </InputLabel>
                <Select
                  value={employeeData.collaboration}
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
                onChange={(e) => handleCommentChange(e, "collaboration")}
                value={comments.collaboration}
              />

              {/* Add more form fields based on your requirements */}

              <FormControl fullWidth margin="dense">
                <InputLabel required>Adapting to new tasks:</InputLabel>
                <Select
                  value={employeeData.adaptingToNewTasks}
                  name="adaptingToNewTasks"
                  onChange={(e) => handleOnChange(e)}
                  label="Adapting to new tasks"
                  error={errors.adaptingToNewTasks}
                >
                  <MenuItem value="veryAdaptable">Very Adaptable</MenuItem>
                  <MenuItem value="moderatelyAdaptable">
                    Moderately Adaptable
                  </MenuItem>
                  <MenuItem value="resistantToChange">
                    Resistant to Change
                  </MenuItem>
                </Select>
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
                onChange={(e) => handleCommentChange(e, "adaptingToNewTasks")}
                value={comments.adaptingToNewTasks}
              />

              <FormControl fullWidth margin="dense">
                <InputLabel required>
                  Handling conflicts within the team:
                </InputLabel>
                <Select
                  value={employeeData.conflictHandling}
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
                onChange={(e) => handleCommentChange(e, "conflictHandling")}
                value={comments.conflictHandling}
              />

              <FormControl fullWidth margin="dense">
                <InputLabel required>
                  Mentorship or support for colleagues:
                </InputLabel>
                <Select
                  value={employeeData.mentorshipSupport}
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
                onChange={(e) => handleCommentChange(e, "mentorshipSupport")}
                value={comments.mentorshipSupport}
              />

              <FormControl fullWidth margin="dense">
                <InputLabel required>
                  Ethical behavior in the workplace:
                </InputLabel>
                <Select
                  value={employeeData.ethicalBehavior}
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
                onChange={(e) => handleCommentChange(e, "ethicalBehavior")}
                value={comments.ethicalBehavior}
              />

              <FormControl fullWidth margin="dense">
                <InputLabel required>
                  Handling customer or client interactions:
                </InputLabel>
                <Select
                  value={employeeData.customerInteractions}
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
                onChange={(e) => handleCommentChange(e, "customerInteractions")}
                value={comments.customerInteractions}

              />

              <FormControl fullWidth margin="dense">
                <InputLabel required>
                  Handling feedback and criticism:
                </InputLabel>
                <Select
                  value={employeeData.feedbackHandling}
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
                onChange={(e) => handleCommentChange(e, "feedbackHandling")}
                value={comments.feedbackHandling}

              />

              <Box sx={{ width: 300 }}>
                <h2>Communication Skills</h2>
                <Slider
                  aria-label="Communication Skills"
                  defaultValue={employeeData.communicationSkills}
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
              {/* <Textarea aria-label="empty textarea" placeholder="Comments" className="m-4" onChange={(e) => handleCommentChange(e, "mentorshipSupport")}/> */}
            </>
          )}

          <div className="my-5">
            <Button variant="contained" color="primary" fullWidth type="submit">
              {step === 1 ? "Next" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reviewform;
