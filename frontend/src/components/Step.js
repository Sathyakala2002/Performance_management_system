import React from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../features/page';
import { useFeedbackContext } from '../context/FeedbackContext';

const Step = ({ step, title, active }) => {
  const { feedbackWithEmptyValues } = useFeedbackContext();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPage(step - 1));
  };

  const hasEmptyValues = feedbackWithEmptyValues.some(([feedbackTitle]) => feedbackTitle === title);
  console.log(hasEmptyValues, "found ");

  return (
    <div className={`Step ${active ? 'active' : ''}`} onClick={handleClick}>
      <span className={active ? 'stepNumber active' : 'stepNumber'}>{step}</span>
      <div className='stepInfo'>
        <span>STEP {step}</span>
        <p>
          {title}
          {hasEmptyValues && <div className="non-filled-mark text-red-500 text-2xl">&#10006;</div>}
          {/* {active &&(!hasEmptyValues && <div className="tick-mark">&#10004;</div>)} */}
        </p>
      </div>
    </div>
  );
};

export default Step;
