import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectFeedbackData } from "../features/feedbackSlice";
import { useNavigate } from "react-router-dom";
import { useFeedbackContext } from "../context/FeedbackContext";
import { Typography } from "@material-tailwind/react";

const SubmitPage = () => {
  const navigate = useNavigate();
  const { setFeedbackData } = useFeedbackContext();
  const formattedFeedbackData = useSelector(selectFeedbackData);
  const storedEmployeeID = localStorage.getItem("selectedEmployeeID");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter feedback entries with empty values
    const feedbackWithEmptyValues = Object.keys(formattedFeedbackData)
      .filter((key) => {
        const { type, attendancePercentage } = formattedFeedbackData[key];
        return type === "" || attendancePercentage === null;
      });

    if (feedbackWithEmptyValues.length > 0) {
      console.error("Error: Some feedback titles have empty values or ratings");
      console.log("Feedback with empty values:", feedbackWithEmptyValues);
      setFeedbackData(feedbackWithEmptyValues);
      return;
    }

    try {
      await axios.post("http://localhost:5000/feedback", {
        formattedFeedbackData,
        storedEmployeeID,
      });

      console.log("Form submitted successfully");
      navigate("/table");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <img
        src="https://img.freepik.com/free-vector/thank-you-concept-illustration_114360-13427.jpg?w=1380&t=st=1706171741~exp=1706172341~hmac=c1b4d1ac64b7c8cca3c09cd9c21e0e410d5a6d6202d75dd797f0e328525fcfe3"
        alt="Thank you"
        className="my-10"
        width={350}
        height={350}
      />
      <form onSubmit={handleSubmit} className="mb-4">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="px-10 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit feedback
        </Button>
        {/* {feedbackWithEmptyValues.length > 0 && (
          <Typography style={{ color: "black", fontWeight: "bold", marginTop: "10px" }}>
            Some feedback entries have empty values or ratings!
          </Typography>
        )} */}
      </form>
    </div>
  );
};

export default SubmitPage;
