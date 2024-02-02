import React, { useState, useEffect,useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Bar } from "../layout/m";
import {FormControl,Rating} from "@mui/material";
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';



const FeedbackDetails = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(0);
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const settings = {
    dots: true,
    backgroundColor: "rgba(52, 7, 53, 0)",
    infinite: true,
    // backgroundColor: "#340735",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <div
        style={{
          right: "20px",
          zIndex: 1,
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          background: "##03001c",
          color: "#fff",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        {" "}
        &gt;{" "}
      </div>
    ),
    prevArrow: (
      <div
        style={{
          left: "20px",
          zIndex: 1,
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          background: "#333",
          color: "#fff",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        {" "}
        &lt;{" "}
      </div>
    ),
    beforeChange: (current, next) => setSelectedEmployeeIndex(next),
  };

  const storedEmployeeID = localStorage.getItem("selectedEmployeeID");

  const images =[
    "https://img.freepik.com/free-vector/mind-map-concept-illustration_114360-2290.jpg?w=826&t=st=1705738407~exp=1705739007~hmac=bdfc3b4b339891ee68014412341da93cbe4c9b86c233ea27f65048e1c4725d7e",
    "https://img.freepik.com/free-vector/teamwork-people-with-puzzle-pieces_24877-54950.jpg?w=826&t=st=1705740443~exp=1705741043~hmac=1744ff743619ff21e61b26aff37015fe0e3f3600fbbaf06060807b6ecf7c7815",
    "https://img.freepik.com/free-vector/racial-discrimination-abstract-concept-vector-illustration-discrimination-based-skin-colour-racial-ethnic-origin-bullying-harassment-equal-rights-prejudice-abstract-metaphor_335657-4190.jpg?w=826&t=st=1705741070~exp=1705741670~hmac=e63540311ffe381eb086317a78ac048d1eaa50de9fac1d9d1352b71a563a0f50",
    ""
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formResponse = await axios.get(
          "http://localhost:5000/getfeedback"
        );
        const formData = formResponse.data.db;
        setFeedbackData(formData);

        const employeeResponse = await axios.get(
          "http://localhost:5000/getemplyee"
        );
        const employeeData = employeeResponse.data.db;
        const selectedEmployee = employeeData.find(
          (employee) => employee.employee_Id === storedEmployeeID);
             console.log(selectedEmployee,"received");
        setEmployeeDetails(employeeData);
      } catch (error) {
        console.log(error.message, { variant: "error" });
      }
    };

    fetchData();
  }, []);
  const array = feedbackData[0];
  const attendancePercentage = array && array.attendancePercentage;
  // console.log(array.attendancePercentage,"dounce")
  useEffect(() => {
    if (chartContainer.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["Attendance Percentage", "Absent Percentage"],
          datasets: [
            {
              data: [attendancePercentage, 100 - attendancePercentage],
              backgroundColor: ["#36A2EB", "#FFCE56"],
            },
          ],
        },
      });
    }
  }, [attendancePercentage]);
 
  return (
    <div>
      <Bar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            position: "relative", // Add relative position
            margin: "30px",
            padding: "90px",
            borderRadius: "8px",
            boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.1)",
            width: "100%", // Adjusted for responsiveness
            height: "500px",
            maxWidth: "600px", // Added max width for larger screens
            overflow: "hidden", // Hide overflow to prevent overlay from extending
          }}
        >
          <div
            style={{
              position: "absolute", // Add absolute position
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: "url(https://img.freepik.com/free-vector/mind-map-concept-illustration_114360-2290.jpg?w=826&t=st=1705738407~exp=1705739007~hmac=bdfc3b4b339891ee68014412341da93cbe4c9b86c233ea27f65048e1c4725d7e)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: 0.09,
              borderRadius: "8px", // Ensure the overlay has the same border radius as the main container
            }}
          ></div>

          <h1 className="font-medium" style={{ position: "relative", zIndex: 1 }}>
            Welcome!
          </h1>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "24px",
              color: "#333",
              fontWeight: "bold",
              textTransform: "uppercase",
              position: "relative",
              zIndex: 1,
            }}
          >
            Employee Feedback Details
          </h2>
          {/* <canvas ref={chartContainer} width="400" height="400"></canvas> */}
          {feedbackData.length > 0 && (
            <Slider {...settings} initialSlide={selectedEmployeeIndex}>
              {Object.keys(array).map((key, index) => (
                <div
                  key={index}
                  style={{
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  <h2
                    style={{
                      textAlign: "center",
                      marginBottom: "20px",
                      fontSize: "24px",
                      textTransform: "uppercase",
                    }}
                  >
              {key}:
                  </h2>
                  {Object.entries(array[key]).map(([innerKey, innerValue]) => (
                    <div
                      key={innerKey}
                      style={{
                        marginBottom: "10px",
                        display: "flex", // Add this line
                        alignItems: "center", // Align items vertically
                      }}
                    >
                      <label style={{ fontWeight: "bold", marginRight: "5px" }} className="mx-5">
                        {innerKey}:
                      </label>
                      {innerKey === "rating" ? (
                        <FormControl fullWidth margin="dense">
                          <Rating
                            className="mt-1"
                            name="taskCompletionRating"
                            value={innerValue}
                            size="large"
                          />
                        </FormControl>
                      ) : (
                        <span className="mx-3">{innerValue}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </Slider>
          )}
        </div>
        <div
          style={{
            position: "relative", // Add relative position
            margin: "30px",
            padding: "90px",
            borderRadius: "8px",
            boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.1)",
            width: "100%", // Adjusted for responsiveness
            height: "500px",
            maxWidth: "600px", // Added max width for larger screens
            overflow: "hidden", // Hide overflow to prevent overlay from extending
          }}
        >
          <div
            style={{
              position: "absolute", // Add absolute position
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: "url(https://img.freepik.com/free-vector/mind-map-concept-illustration_114360-2290.jpg?w=826&t=st=1705738407~exp=1705739007~hmac=bdfc3b4b339891ee68014412341da93cbe4c9b86c233ea27f65048e1c4725d7e)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: 0.2,
              borderRadius: "8px", // Ensure the overlay has the same border radius as the main container
            }}
          ></div>

          <h1 className="font-medium" style={{ position: "relative", zIndex: 1 }}>
            Welcome!
          </h1>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "24px",
              color: "#333",
              fontWeight: "bold",
              textTransform: "uppercase",
              position: "relative",
              zIndex: 1,
            }}
          >
            Employee Feedback Details
          </h2>
          <canvas ref={chartContainer} width="400" height="400"></canvas>
          {feedbackData.length > 0 && (
            <Slider {...settings} initialSlide={selectedEmployeeIndex}>
              {Object.keys(array).map((key, index) => (
                <div
                  key={index}
                  style={{
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  <h2
                    style={{
                      textAlign: "center",
                      marginBottom: "20px",
                      fontSize: "24px",
                      textTransform: "uppercase",
                    }}
                  >
              {key}:
                  </h2>
                  {Object.entries(array[key]).map(([innerKey, innerValue]) => (
                    <div
                      key={innerKey}
                      style={{
                        marginBottom: "10px",
                        display: "flex", // Add this line
                        alignItems: "center", // Align items vertically
                      }}
                    >
                      <label style={{ fontWeight: "bold", marginRight: "5px" }} className="mx-5">
                        {innerKey}:
                      </label>
                      {innerKey === "rating" ? (
                        <FormControl fullWidth margin="dense">
                          <Rating
                            className="mt-1"
                            name="taskCompletionRating"
                            value={innerValue}
                            size="large"
                          />
                        </FormControl>
                      ) : (
                        <span className="mx-3">{innerValue}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetails;
