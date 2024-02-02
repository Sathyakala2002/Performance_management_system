
const employeefeedback = require("../models/feedbackSchema");

const getFeedback = async (req, res) => {
  try {
    const db = await employeefeedback.find().select('-_id -__v');

    if (db.length > 0) {
      return res.status(200).json({ message: "Data fetched successfully", db});
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
      formattedFeedbackData,
      storedEmployeeID
    } = req.body || {};
    const {
      adaptingToNewTasks,
      collaboration,
      communicationSkills,
      conflictHandling,
      customerInteractions,
      ethicalBehavior,
      feedbackHandling,
      initiative,
      meetingDeadlines,
      mentorshipSupport,
      taskCompletion,
      timingKeepup,
      attendancePercentage,
  
    } = formattedFeedbackData || {};

    const newUser = new employeefeedback({
      adaptingToNewTasks,
      collaboration,
      communicationSkills,
      conflictHandling,
      customerInteractions,
      ethicalBehavior,
      feedbackHandling,
      initiative,
      meetingDeadlines,
      mentorshipSupport,
      taskCompletion,
      timingKeepup,
      attendancePercentage,
      storedEmployeeID
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
