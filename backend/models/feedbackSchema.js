const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  employeeNmae : {
    type : String,
  },
  adaptingToNewTasks: {
    type: String,
  },
  adaptingToNewTasksComment: {
    type: String,
  },
  adaptingToNewTasksRating: {
    type: Number,
  },
  collaboration: {
    type: String,
  },
  collaborationComment: {
    type:String,
  },
  collaborationRating:{
    type :Number,
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
  conflictHandlingRating: {
    type: Number,
  },
  customerInteractions: {
    type: String,
  },
  customerInteractionsComment: {
    type: String,
  },
  customerInteractionsRating: {
    type: Number,
  },
  ethicalBehavior: {
    type: String,
  },
  ethicalBehaviorComment: {
    type: String,
  },
  ethicalBehaviorRating: {
    type: Number,
  },
  feedbackHandling: {
    type: String,
  },
  feedbackHandlingComment: {
    type: String,
  },
  feedbackHandlingRating: {
    type: Number,
  },
  initiative: {
    type: String,
  },
  initiativeComment: {
    type: String,
    default: "",
  },
  initiativeRating: {
    type: Number,
  },
  meetingDeadlines: {
    type: String,
  },
  meetingDeadlinesComment: {
    type: String,
  },
  meetingDeadlinesRating: {
    type: Number,
  },
  mentorshipSupport: {
    type: String,
  },
  mentorshipSupportComment: {
    type: String,
  },
  mentorshipSupportRating: {
    type: Number,
  },
  taskCompletion: {
    type: String,
  },
  taskCompletionComment: {
    type: String,
    default: "",
  },
  taskCompletionRating: {
    type: Number,
  },
  timingKeepup
: {
    type: String,
  },
  timingKeepupComment: {
    type: String,
    default: "",
  },
  timingKeepupRating: {
    type: Number,
  },
  attendancePercentage:{
    type:Number,
  },
  
  
});

module.exports = mongoose.model("Feedback", feedbackSchema);
