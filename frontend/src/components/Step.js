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
  console.log(feedbackWithEmptyValues,"stepfafwegwg");

  const hasEmptyValues = feedbackWithEmptyValues.some(([feedbackTitle]) => feedbackTitle === title);
  return (
    <div className={`Step ${active ? 'active' : ''}`} onClick={handleClick}>
      <span className={active ? 'stepNumber active' : 'stepNumber'}>{step}</span>
      <div className='stepInfo'>
        <span>STEP {step}</span>
        <p>
          {title}
          {hasEmptyValues && <span className="non-filled-mark text-red-500 text-2xl">&#10006;</span>}
        </p>
      </div>
    </div>
  );
};

export default Step;
