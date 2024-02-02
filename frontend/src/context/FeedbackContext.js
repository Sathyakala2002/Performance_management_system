import { createContext, useContext, useState } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbackWithEmptyValues, setFeedbackWithEmptyValues] = useState([]);

  const setFeedbackData = (data) => {
    setFeedbackWithEmptyValues(data);
  };

  return (
    <FeedbackContext.Provider value={{ feedbackWithEmptyValues, setFeedbackData }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedbackContext = () => {
  return useContext(FeedbackContext);
};
