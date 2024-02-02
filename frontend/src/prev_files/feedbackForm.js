import React, { useState,useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Slider,
  Rating,
  Select,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { TextareaAutosize, Typography } from "@mui/material";

import axios from "axios";
import { Bar } from "../layout/m";

const FeedbackForm = () => {

  const initialFeedbackState = {
    employeeId:"",
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
    conflictHandlingComment: "",
    mentorshipSupport: "",
    mentorshipSupportComment: "",
    ethicalBehavior: "",
    ethicalBehaviorComment: "",
    customerInteractions: "",
    customerInteractionsComment: "",
    feedbackHandling: "",
    feedbackHandlingComment: "",
    timingKeepup: "",
    timingKeepupComment: "",
    communicationSkills: "",
    communicationSkillsComment: "",
    attendancePercentage: null,
    taskCompletionRating: 0,
    meetingDeadlinesRating: 0,
    initiativeRating: 0,
    collaborationRating: 0,
    adaptingToNewTasksRating: 0,
    conflictHandlingRating: 0,
    mentorshipSupportRating: 0,
    ethicalBehaviorRating: 0,
    customerInteractionsRating: 0,
    feedbackHandlingRating: 0,
    timingKeepupRating: 0,
    communicationRating: 0
  };

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [feedbackData, setFeedbackData] = useState(initialFeedbackState);
  const [attendancePercentage, setAttendancePercentage] = useState(null);
  const [totalWorkingDays, setTotalWorkingDays] = useState("");
  const [employeeList, setEmployeeList] = useState([]); // New state for employee list
  const [daysPresent, setDaysPresent] = useState("");
  const [errors, setErrors] = useState({
    taskCompletion: "",
    meetingDeadlines: "",
    initiative: "",
    collaboration: "",
    adaptingToNewTasks: "",
    conflictHandling: "",
    mentorshipSupport: "",
    ethicalBehavior: "",
    customerInteractions: "",
    feedbackHandling: "",
    timingKeepup: "",
    attendancePercentage: null,
  });
  const storedEmployeeID = localStorage.getItem("selectedEmployeeID");
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFeedbackData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  const handleCalculateAttendance = () => {
    const totalDays = parseInt(totalWorkingDays, 10);
    const presentDays = parseInt(daysPresent, 10);

    if (
      !isNaN(totalDays) &&
      !isNaN(presentDays) &&
      totalDays > 0 &&
      presentDays >= 0
    ) {
      const percentage = (presentDays / totalDays) * 100;
      setAttendancePercentage(percentage.toFixed(2));
      setFeedbackData((prevData) => ({
        ...prevData,
        attendancePercentage: percentage.toFixed(2),
      }));
    } else {
      setAttendancePercentage(null);
      setFeedbackData((prevData) => ({
        ...prevData,
        attendancePercentage: null,
      }));
    }
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
  console.log(feedbackData,"feedbackData");
  useEffect(() => {

const fetchEmployeeData = async () => {
  try {
    const response = await fetch("http://localhost:5000/getemplyee");
    if (!response.ok) {
      console.log("Network response was not ok");
      return;
    }
    const data = await response.json();
    console.log(data);
    enqueueSnackbar(data.message, { variant: "success" });
    setEmployeeList(data.db); 
  } catch (error) {
    enqueueSnackbar(error.message, { variant: "error" });
  }
};



fetchEmployeeData();
}, []); 

const handleOnSubmit = async (e) => {
  e.preventDefault();

  // Structure feedbackData based on the schema
  const formattedFeedbackData = {
    employeeName: "",
    adaptingToNewTasks: {
      type: feedbackData.adaptingToNewTasks || "",
      comment: feedbackData.adaptingToNewTasksComment || "",
      rating: feedbackData.adaptingToNewTasksRating || 0,
    },
    collaboration: {
      type: feedbackData.collaboration || "",
      comment: feedbackData.collaborationComment || "",
      rating: feedbackData.collaborationRating || 0,
    },
    communicationSkills: feedbackData.communicationSkills || 0,
    conflictHandling: {
      type: feedbackData.conflictHandling || "",
      comment: feedbackData.conflictHandlingComment || "",
      rating: feedbackData.conflictHandlingRating || 0,
    },
    customerInteractions: {
      type: feedbackData.customerInteractions || "",
      comment: feedbackData.customerInteractionsComment || "",
      rating: feedbackData.customerInteractionsRating || 0,
    },
    ethicalBehavior: {
      type: feedbackData.ethicalBehavior || "",
      comment: feedbackData.ethicalBehaviorComment || "",
      rating: feedbackData.ethicalBehaviorRating || 0,
    },
    feedbackHandling: {
      type: feedbackData.feedbackHandling || "",
      comment: feedbackData.feedbackHandlingComment || "",
      rating: feedbackData.feedbackHandlingRating || 0,
    },
    initiative: {
      type: feedbackData.initiative || "",
      comment: feedbackData.initiativeComment || "",
      rating: feedbackData.initiativeRating || 0,
    },
    meetingDeadlines: {
      type: feedbackData.meetingDeadlines || "",
      comment: feedbackData.meetingDeadlinesComment || "",
      rating: feedbackData.meetingDeadlinesRating || 0,
    },
    mentorshipSupport: {
      type: feedbackData.mentorshipSupport || "",
      comment: feedbackData.mentorshipSupportComment || "",
      rating: feedbackData.mentorshipSupportRating || 0,
    },
    taskCompletion: {
      type: feedbackData.taskCompletion || "",
      comment: feedbackData.taskCompletionComment || "",
      rating: feedbackData.taskCompletionRating || 0,
    },
    timingKeepup: {
      type: feedbackData.timingKeepup || "",
      comment: feedbackData.timingKeepupComment || "",
      rating: feedbackData.timingKeepupRating || 0,
    },
    attendancePercentage: feedbackData.attendancePercentage || 0,
  };

  await axios
    .post("http://localhost:5000/feedback", formattedFeedbackData)
    .then((response) => {
      enqueueSnackbar(response.data.message, { variant: "success" });
      console.log("Form submitted:", formattedFeedbackData);
      setFeedbackData(initialFeedbackState);
      navigate("/table");
    })
    .catch((error) => {
      console.error("API error:", error);
    });
};


  return (
    <div>
      <Bar/>
      <div
  className="shadow-md p-8 w-96 mx-auto mt-12 flex items-center justify-center"
  style={{ width: "50%", height: "80%"}}
>
        <form method="post" onSubmit={(e) => handleOnSubmit(e)}>
        <div  className="mx-auto mt-12 ">
<FormControl fullWidth margin="dense">
        <InputLabel required>Select employee Id:</InputLabel>
        <Select
  value={storedEmployeeID}
  name="employeeId"
  onChange={(e) => handleOnChange(e)}
  label="Employee Id"
  error={errors.employeeId}
>
  {employeeList.map((employee) => (
    <MenuItem key={employee.employee_ID} value={employee.employee_ID}>
      {employee.employee_ID}
    </MenuItem>
  ))}
</Select>
        {errors.employeeId && (
          <span style={{ color: "red", fontSize: "0.75rem" }}>
            {errors.employeeId}
          </span>
        )}
      </FormControl>

      </div>
          <h1 className="text-center font-semibold text-blue-800 text-2xl my-6">
            Feedback Form
          </h1>
          <>
            {/* Task Completion */}
            <FormControl fullWidth margin="dense">
              <InputLabel required>Task Completion:</InputLabel>
              <Select
                value={feedbackData.taskCompletion}
                name="taskCompletion"
                onChange={(e) => handleOnChange(e)}
                label="Task Completion"
                error={errors.taskCompletion}
              >
                <MenuItem value="Always Completes Tasks on Time">
                  Always Completes Tasks on Time
                </MenuItem>
                <MenuItem value="Often Completes Tasks on Time">
                  Often Completes Tasks on Time
                </MenuItem>
                <MenuItem value="Rarely Completes Tasks on Time">Rarely Completes Tasks on Time</MenuItem>
              </Select>
              {errors.taskCompletion && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.taskCompletion}
                </span>
              )}
            </FormControl>
            <TextareaAutosize
              name="taskCompletionComment"
              value={feedbackData.textarea1}
              onChange={(e) =>
                handleTextareaChange("taskCompletionComment", e.target.value)
              }
              placeholder="Comment "
              style={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            {/* Task Completion Rating */}
            <FormControl fullWidth margin="dense">
              <InputLabel required>Task Completion Rating:</InputLabel>
              <Rating
                className="mt-9"
                name="taskCompletionRating"
                value={feedbackData.taskCompletionRating}
                onChange={(e) =>
                  handleRatingChange("taskCompletionRating", e.target.value)
                }
                error={errors.adaptingToNewTasks}
                size="large"
              />
            </FormControl>

            {/* Meeting Deadlines */}
            <FormControl fullWidth margin="dense">
              <InputLabel required>Meeting Deadlines:</InputLabel>
              <Select
                value={feedbackData.meetingDeadlines}
                name="meetingDeadlines"
                onChange={(e) => handleOnChange(e)}
                label="Meeting Deadlines"
                error={errors.meetingDeadlines}
              >
                <MenuItem value="Always Meets Deadlines">Always Meets Deadlines</MenuItem>
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
            {/* Meeting Deadlines Comment */}
            <TextareaAutosize
              name="meetingDeadlinesComment"
              value={feedbackData.meetingDeadlinesComment}
              onChange={(e) =>
                handleTextareaChange("meetingDeadlinesComment", e.target.value)
              }
              placeholder="meetingDeadlinesComment "
              style={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            {/* Meeting Deadlines Rating */}
            <FormControl fullWidth margin="dense">
              <InputLabel required>Meeting Deadline Rating:</InputLabel>
              <Rating
                className="mt-9"
                name="meetingDeadlinesRating"
                value={feedbackData.meetingDeadlinesRating}
                onChange={(e) =>
                  handleRatingChange("meetingDeadlinesRating", e.target.value)
                }
                error={errors.adaptingToNewTasks}
                size="large"
              />
            </FormControl>

            {/* Initiative */}
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
            {/* Initiative Comment */}
            <TextareaAutosize
              name="initiativeComment"
              value={feedbackData.initiativeComment}
              onChange={(e) =>
                handleTextareaChange("initiativeComment", e.target.value)
              }
              placeholder="initiativeComment "
              style={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            {/* Initiative Rating */}
            <FormControl fullWidth margin="dense">
              <InputLabel required>Initiative Rating:</InputLabel>
              <Rating
                className="mt-9"
                name="initiativeRating"
                value={feedbackData.initiativeRating}
                onChange={(e) =>
                  handleRatingChange("initiativeRating", e.target.value)
                }
                error={errors.adaptingToNewTasks}
                size="large"
              />
            </FormControl>

            {/* Collaboration */}
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
            {/* Collaboration Comment */}
            <TextareaAutosize
              name="collaborationComment"
              value={feedbackData.collaborationComment}
              onChange={(e) =>
                handleTextareaChange("collaborationComment", e.target.value)
              }
              placeholder="collaborationComment "
              style={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            {/* Collaboration Rating */}
            <FormControl fullWidth margin="dense">
              <InputLabel required>Collaboration Rating:</InputLabel>
              <Rating
                className="mt-9"
                name="collaborationRating"
                value={feedbackData.collaborationRating}
                onChange={(e) =>
                  handleRatingChange("collaborationRating", e.target.value)
                }
                error={errors.adaptingToNewTasks}
                size="large"
              />
            </FormControl>

            {/* Adapting to new tasks */}
            <FormControl fullWidth margin="dense">
              <InputLabel required>Adapting to new tasks:</InputLabel>
              <Select
                value={feedbackData.adaptingToNewTasks}
                name="adaptingToNewTasks"
                onChange={(e) => handleOnChange(e)}
                error={errors.adaptingToNewTasks}
              >
                <MenuItem value="highlyAdapts">Highly Adapts</MenuItem>
                <MenuItem value="moderatelyAdapts">Moderately Adapts</MenuItem>
                <MenuItem value="strugglesToAdapt">Struggles to Adapt</MenuItem>
              </Select>
              {errors.adaptingToNewTasks && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.adaptingToNewTasks}
                </span>
              )}
            </FormControl>
            {/* Adapting to new tasks Comment */}
            <TextareaAutosize
              name="adaptingToNewTasksComment"
              value={feedbackData.adaptingToNewTasksComment}
              onChange={(e) =>
                handleTextareaChange(
                  "adaptingToNewTasksComment",
                  e.target.value
                )
              }
              placeholder="adaptingToNewTasksComment "
              style={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            {/* Adapting to new tasks Rating */}
            <FormControl fullWidth margin="dense">
              <InputLabel required>Adapting to new Skills Rating:</InputLabel>
              <Rating
                className="mt-9"
                name="adaptingToNewTasksRating"
                value={feedbackData.adaptingToNewTasksRating}
                onChange={(e) =>
                  handleRatingChange("adaptingToNewTasksRating", e.target.value)
                }
                error={errors.adaptingToNewTasks}
                size="large"
              />
            </FormControl>

            {/* Conflict Handling */}
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
            {/* Conflict Handling Comment */}
            <TextareaAutosize
              name="conflictHandlingComment"
              value={feedbackData.conflictHandlingComment}
              onChange={(e) =>
                handleTextareaChange("conflictHandlingComment", e.target.value)
              }
              placeholder="conflictHandlingComment "
              style={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            {/* Conflict Handling Rating */}
            <FormControl fullWidth margin="dense">
              <InputLabel required>Conflict Handling Rating:</InputLabel>
              <Rating
                className="mt-9"
                name="conflictHandlingRating"
                value={feedbackData.conflictHandlingRating}
                onChange={(e) =>
                  handleRatingChange("conflictHandlingRating", e.target.value)
                }
                error={errors.adaptingToNewTasks}
                size="large"
              />
            </FormControl>

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
            <TextareaAutosize
              name="mentorshipSupportComment"
              value={feedbackData.mentorshipSupportComment}
              onChange={(e) =>
                handleTextareaChange("mentorshipSupportComment", e.target.value)
              }
              placeholder="mentorshipSupportComment "
              style={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel required>Mentorship Support Rating:</InputLabel>
              <Rating
                className="mt-9"
                name="mentorshipSupportRating"
                value={feedbackData.mentorshipSupportRating}
                onChange={(e) =>
                  handleRatingChange("mentorshipSupportRating", e.target.value)
                }
                error={errors.adaptingToNewTasks}
                size="large"
              />
            </FormControl>

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
            <TextareaAutosize
              name="ethicalBehaviorComment"
              value={feedbackData.ethicalBehaviorComment}
              onChange={(e) =>
                handleTextareaChange("ethicalBehaviorComment", e.target.value)
              }
              placeholder="ethicalBehaviorComment "
              style={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel required>Ethical Behavior Rating:</InputLabel>
              <Rating
                className="mt-9"
                name="ethicalBehaviorRating"
                value={feedbackData.ethicalBehaviorRating}
                onChange={(e) =>
                  handleRatingChange("ethicalBehaviorRating", e.target.value)
                }
                error={errors.adaptingToNewTasks}
                size="large"
              />
            </FormControl>
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
            <TextareaAutosize
              name="customerInteractionsComment"
              value={feedbackData.customerInteractionsComment}
              onChange={(e) =>
                handleTextareaChange(
                  "customerInteractionsComment",
                  e.target.value
                )
              }
              placeholder="customerInteractionsComment "
              style={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel required>Customer Interactions Rating:</InputLabel>
              <Rating
                className="mt-9"
                name="customerInteractionsRating"
                value={feedbackData.customerInteractionsRating}
                onChange={(e) =>
                  handleRatingChange(
                    "customerInteractionsRating",
                    e.target.value
                  )
                }
                error={errors.adaptingToNewTasks}
                size="large"
              />
            </FormControl>
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
            <TextareaAutosize
              name="feedbackHandlingComment"
              value={feedbackData.feedbackHandlingComment}
              onChange={(e) =>
                handleTextareaChange("feedbackHandlingComment", e.target.value)
              }
              placeholder="feedbackHandlingComment "
              style={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel required>Feedback Handling Rating:</InputLabel>
              <Rating
                className="mt-9"
                name="feedbackHandlingRating"
                value={feedbackData.feedbackHandlingRating}
                onChange={(e) =>
                  handleRatingChange("feedbackHandlingRating", e.target.value)
                }
                error={errors.adaptingToNewTasks}
                size="large"
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel required>
                Timely Login and Logout Practices:
              </InputLabel>
              <Select
                value={feedbackData.timingKeepup}
                name="timingKeepup"
                onChange={(e) => handleOnChange(e)}
                label="Timely Login and Logout Practices"
                error={errors.timingKeepup}
              >
                <MenuItem value="consistentlyOnTime">
                  Consistently On Time
                </MenuItem>
                <MenuItem value="occasionalDelays">Occasional Delays</MenuItem>
                <MenuItem value="challengeswithPunctuality">
                  Challenges with Punctuality
                </MenuItem>
              </Select>
              {errors.timingKeepup && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.timingKeepup}
                </span>
              )}
            </FormControl>
            <TextareaAutosize
              name="timingKeepupComment"
              value={feedbackData.timingKeepupComment}
              onChange={(e) =>
                handleTextareaChange("timingKeepupComment", e.target.value)
              }
              placeholder="timingKeepupComment "
              style={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel required>timing Keepup Rating:</InputLabel>
              <Rating
                className="mt-9"
                name="timingKeepupRating"
                value={feedbackData.timingKeepupRating}
                onChange={(e) =>
                  handleRatingChange("timingKeepup", e.target.value)
                }
                error={errors.timingKeepup}
                size="large"
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel required>
                Communication Skills
              </InputLabel>
              <Select
                value={feedbackData.communicationSkills}
                name="communicationSkills"
                onChange={(e) => handleOnChange(e)}
                label="Communication skills"
                error={errors.communicationSkills}
              >
                <MenuItem value="Excellent">
                  Excellent
                </MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Need Improvement">
                  Need Improvement
                </MenuItem>
              </Select>
              {errors.communicationSkills && (
                <span style={{ color: "red", fontSize: "0.75rem" }}>
                  {errors.communicationSkills}
                </span>
              )}
            </FormControl>
            <TextareaAutosize
              name="communicationSkillsComment"
              value={feedbackData.communicationSkillsComment}
              onChange={(e) =>
                handleTextareaChange("communicationSkillsComment", e.target.value)
              }
              placeholder="comment"
              style={{
                width: "100%",
                marginBottom: "10px",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel required>Communication Rating:</InputLabel>
              <Rating
                className="mt-9"
                name="communicationRating"
                value={feedbackData.communicationRating}
                onChange={(e) =>
                  handleRatingChange("communicationRating", e.target.value)
                }
                error={errors.communicationSkills}
                size="large"
              />
            </FormControl>
            <Box mt={3}>
              <Typography variant="h5">Attendance Calculator</Typography>
            </Box>
            <Box mt={2}>
              <TextField
                label="Total Working Days"
                type="number"
                value={totalWorkingDays}
                onChange={(e) => setTotalWorkingDays(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box mt={2}>
              <TextField
                label="Days Present"
                type="number"
                value={daysPresent}
                onChange={(e) => setDaysPresent(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Box>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCalculateAttendance}
              >
                Calculate Attendance
              </Button>
            </Box>
            {attendancePercentage !== null && (
              <Box mt={2}>
                <Typography variant="h6">
                  Attendance Percentage: {attendancePercentage}%
                </Typography>
              </Box>
            )}
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
