const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  adaptingToNewTasks: {
    type: String,
  },
  adaptingToNewTasksComment: {
    type: String,
  },
  collaboration: {
    type: String,
  },
  collaborationComment: {
  },
  communicationSkills: {
    type: Number,
  },
  conflictHandling: {
    type: String,
  },
  conflictHandlingComment: {
    type: String,
  },
  conflictHandlingcomment: {
    type: String,
  },
  customerInteractions: {
    type: String,
  },
  customerInteractionsComment: {
    type: String,
  },
  ethicalBehavior: {
    type: String,
  },
  ethicalBehaviorComment: {
    type: String,
  },
  feedbackHandling: {
    type: String,
  },
  feedbackHandlingComment: {
    type: String,
  },
  initiative: {
    type: String,
  },
  initiativeComment: {
    type: String,
    default: "",
  },
  meetingDeadlines: {
    type: String,
  },
  meetingDeadlinesComment: {
    type: String,
  },
  mentorshipSupport: {
    type: String,
  },
  mentorshipSupportComment: {
    type: String,
  },
  taskCompletion: {
    type: String,
  },
  taskCompletionComment: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
