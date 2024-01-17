import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Sidebar from './sidebar';

const FeedbackDetails = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <div style={{ right: '20px', zIndex: 1, position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: '#333', color: '#fff', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}> &gt; </div>,
    prevArrow: <div style={{ left: '20px', zIndex: 1, position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: '#333', color: '#fff', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}> &lt; </div>,
    beforeChange: (current, next) => setSelectedEmployeeIndex(next),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedEmployeeID = localStorage.getItem('selectedEmployeeID')


        const formResponse = await axios.get('http://localhost:5000/getfeedback');
        const formData = formResponse.data;
        setFeedbackData(formData.db);

        // Fetch employee details
        const employeeResponse = await axios.get('http://localhost:5000/getemplyee');
        const employeeData = employeeResponse.data;
        setEmployeeDetails(employeeData.db);
      } catch (error) {
        console.log(error.message, { variant: 'error' });
      }
    };

    fetchData();
  }, []);
  console.log(employeeDetails,
    "gfhdhdg");
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Sidebar />
      <div style={{ margin: '20px', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', width: '60%' }}>
        <h1>Welcome {employeeDetails.employee_name}!</h1>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Feedback Details</h2>
        {feedbackData.length > 0 && (
          <Slider {...settings} initialSlide={selectedEmployeeIndex}>
            {feedbackData.map((employeeFeedback, index) => (
              <div key={index} style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s' }}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontWeight: 'bold' }}>Task Completion:</label>
                  <span>{employeeFeedback.taskCompletion}</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontWeight: 'bold' }}>Task Completion Comment:</label>
                  <span>{employeeFeedback.taskCompletionComment}</span>
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Task Completion Rating:</label>
                  <span>{employeeFeedback.taskCompletionRating}</span>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default FeedbackDetails;
