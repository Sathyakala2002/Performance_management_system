import React, { useState } from 'react';
import axios from 'axios';
import {
    Button,
  } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectFeedbackData } from '../features/feedbackSlice';
import {useNavigate} from 'react-router-dom'
import { useFeedbackContext } from '../context/FeedbackContext';
import { Typography } from '@material-tailwind/react';


const Submitpage = () => {
  const navigate = useNavigate();
  const { setFeedbackData } = useFeedbackContext();
  const [missedFeedback, setMissedfeedback] = useState([]);
  const formattedFeedbackData = useSelector(selectFeedbackData);
  const storedEmployeeID = localStorage.getItem("selectedEmployeeID");
  console.log(storedEmployeeID,"selected ID");

  const handleSubmit = async (e) => {
  e.preventDefault();

  const feedbackWithEmptyValues = Object.entries(formattedFeedbackData)?.filter(
    ([title, feedback]) => !feedback?.type?.trim() || feedback?.attendancePercentage === "");
    if (feedbackWithEmptyValues.length > 0) {
    console.error('Error: Some feedback titles have empty values or ratings');  
    console.log('Feedback with empty values:', feedbackWithEmptyValues);
    setFeedbackData(feedbackWithEmptyValues);
    setMissedfeedback(feedbackWithEmptyValues);
    return;
  }

  try {
    await axios.post('http://localhost:5000/feedback', { formattedFeedbackData, storedEmployeeID })
      .then((response) => {
        console.log('Form submitted:', response.data.message);
        navigate('/table');
      });
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};
console.log(missedFeedback,"gwgrwgrehteh");
const handleMissedFeedback = () => {
  return (
    <div>
      {missedFeedback && missedFeedback.map((feedback, index) => (
        <h1 key={index}>{feedback}</h1>
      ))}
    </div>
  );
};

  return (
    <div className="flex flex-col items-center justify-between">

      <img src="https://img.freepik.com/free-vector/thank-you-concept-illustration_114360-13427.jpg?w=1380&t=st=1706171741~exp=1706172341~hmac=c1b4d1ac64b7c8cca3c09cd9c21e0e410d5a6d6202d75dd797f0e328525fcfe3" alt="Thank you" className="my-10" width={350} height={350}  />
      <form onSubmit={handleSubmit} className="mb-4">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="px-10 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"

          
        >
          Submit feedback
        </Button>
         {missedFeedback && (
        <Typography style={{ color: "black", fontWeight: "bold", marginTop: "10px" }}>
          You missed some feedbacks!
          <Button onClick={handleMissedFeedback}>Click to View</Button>
        </Typography>
      )}
      </form>
    </div>
  );
};

export default Submitpage;
