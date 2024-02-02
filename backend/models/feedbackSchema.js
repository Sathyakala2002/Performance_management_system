const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  adaptingToNewTasks: {
    type: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  collaboration: {
    type: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  communicationSkills: {
    type: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  ConflictHandling: {
    type: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  customerInteractions: {
    type: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  ethicalBehavior: {
    type: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  feedbackHandling: {
    type: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  initiative: {
    type: {
      type: String,
    },
    comment: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
    },
  },
  meetingDeadlines: {
    type: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  mentorshipSupport: {
    type: {
      type: String,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  taskCompletion: {
    type: {
      type: String,
    },
    comment: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
    },
  },
  timingKeepup: {
    type: {
      type: String,
    },
    comment: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
    },
  },
  attendancePercentage: {
    attendancePercentage:{
      type: Number,
    }
  },
  storedEmployeeID:{
    type: String,
  }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
