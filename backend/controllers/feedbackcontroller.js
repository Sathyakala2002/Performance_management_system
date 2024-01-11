
const employeefeedback = require("../models/feedbackSchema");

const employeeFeedbackSubmit = async (req, res) => {
  try {
    const {
      taskCompletion,
      taskCompletionComment,
      meetingDeadlines,
      meetingDeadlinesComment,
      initiative,
      initiativeComment,
      collaboration,
      collaborationComment,
      adaptingToNewTasks,
      adaptingToNewTasksComment,
      conflictHandling,
      conflictHandlingcomment,
      mentorshipSupport,
      mentorshipSupportComment,
      ethicalBehavior,
      ethicalBehaviorComment,
      customerInteractions,
      customerInteractionsComment,
      feedbackHandling,
      communicationSkills
    } = req.body || {};

    // You might want to add validation for required fields
    // Example:
    // if (!taskCompletion || !meetingDeadlines || !initiative) {
    //   return res.status(400).json({ message: "Incomplete data. All fields are required." });
    // }

    const newUser = new employeefeedback({
      taskCompletion,
      taskCompletionComment,
      meetingDeadlines,
      meetingDeadlinesComment,
      initiative,
      initiativeComment,
      collaboration,
      collaborationComment,
      adaptingToNewTasks,
      adaptingToNewTasksComment,
      conflictHandling,
      conflictHandlingcomment,
      mentorshipSupport,
      mentorshipSupportComment,
      ethicalBehavior,
      ethicalBehaviorComment,
      customerInteractions,
      customerInteractionsComment,
      feedbackHandling,
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
    employeeFeedbackSubmit
};
