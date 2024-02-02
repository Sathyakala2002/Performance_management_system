// feedbackSlice.js
import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: { formattedFeedbackData: null,attendancePercentage: null },
  reducers: {
    setTaskCompletionFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        taskCompletion: action.payload,
      };
    },
    setMeetingDeadlinesFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        meetingDeadlines: action.payload,
      };
    },
    setInitiativeFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        initiative: action.payload,
      };
    },
    setCollaborationFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        collaboration: action.payload,
      };
    },
    setAdaptingToNewTasksFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        adaptingToNewTasks: action.payload,
      };
    },
    setConflictHandlingFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        conflictHandling: action.payload,
      };
    },
    setMentorshipSupportFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        mentorshipSupport: action.payload,
      };
    },
    setEthicalBehaviorFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        ethicalBehavior: action.payload,
      };
    },
    setCustomerInteractionsFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        customerInteractions: action.payload,
      };
    },
    setFeedbackHandlingFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        feedbackHandling: action.payload,
      };
    },
    setTimingKeepupFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        timingKeepup: action.payload,
      };
    },
    setCommunicationSkillsFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        communicationSkills: action.payload,
      };
    },
    setAttendanceFeedback: (state, action) => {
      state.formattedFeedbackData = {
        ...state.formattedFeedbackData,
        attendancePercentage: action.payload,
      };
    }
  },
});

export const {
  setTaskCompletionFeedback,
  setMeetingDeadlinesFeedback,
  setInitiativeFeedback,
  setCollaborationFeedback,
  setAdaptingToNewTasksFeedback,
  setConflictHandlingFeedback,
  setMentorshipSupportFeedback,
  setEthicalBehaviorFeedback,
  setCustomerInteractionsFeedback,
  setFeedbackHandlingFeedback,
  setTimingKeepupFeedback,
  setCommunicationSkillsFeedback,
  setAttendanceFeedback
} = feedbackSlice.actions;
export const selectFeedbackData = (state) => state.feedback.formattedFeedbackData;
export default feedbackSlice.reducer;
