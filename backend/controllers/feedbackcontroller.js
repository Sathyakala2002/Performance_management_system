
const employeefeedback = require("../models/feedbackSchema");

const getFeedback = async (req, res) => {
  try {
    const db = await employeefeedback.find();
    console.log(db);

    if (db.length > 0) {
      return res.status(200).json({ message: "Data fetched successfully", db });
    } else {
      return res.status(404).json({ message: "No data found in the DB" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const employeeFeedbackSubmit = async (req, res) => {
  try {
    const {
      taskCompletion,
      taskCompletionComment,
      taskCompletionRating,
      meetingDeadlines,
      meetingDeadlinesComment,
      meetingDeadlinesRating,
      initiative,
      initiativeComment,
      initiativeRating,
      collaboration,
      collaborationComment,
      collaborationRating,
      adaptingToNewTasks,
      adaptingToNewTasksComment,
      adaptingToNewTasksRating,
      conflictHandling,
      conflictHandlingcomment,
      conflictHandlingRating,
      mentorshipSupport,
      mentorshipSupportComment,
      mentorshipSupportRating,
      ethicalBehavior,
      ethicalBehaviorComment,
      ethicalBehaviorRating,
      customerInteractions,
      customerInteractionsComment,
      customerInteractionsRating,
      feedbackHandling,
      feedbackHandlingComment,
      feedbackHandlingRating,
      timingKeepup,
      timingKeepupComment,
      timingKeepupRating,
      attendancePercentage,
      communicationSkills
    } = req.body || {};

    const newUser = new employeefeedback({
      taskCompletion,
      taskCompletionComment,
      taskCompletionRating,
      meetingDeadlines,
      meetingDeadlinesComment,
      meetingDeadlinesRating,
      initiative,
      initiativeComment,
      initiativeRating,
      collaboration,
      collaborationComment,
      collaborationRating,
      adaptingToNewTasks,
      adaptingToNewTasksComment,
      adaptingToNewTasksRating,
      conflictHandling,
      conflictHandlingcomment,
      conflictHandlingRating,
      mentorshipSupport,
      mentorshipSupportComment,
      mentorshipSupportRating,
      ethicalBehavior,
      ethicalBehaviorComment,
      ethicalBehaviorRating,
      customerInteractions,
      customerInteractionsComment,
      customerInteractionsRating,
      feedbackHandling,
      feedbackHandlingComment,
      feedbackHandlingRating,
      timingKeepup,
      timingKeepupComment,
      timingKeepupRating,
      attendancePercentage,
      communicationSkills
    });

    const result = await newUser.save();
    return res.status(200).json({ message: "Stored successfully!", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server-side error" });
  }
};

module.exports = {
    employeeFeedbackSubmit,getFeedback
};
