import React from 'react'
import { useDispatch} from 'react-redux'
import { next } from '../features/page'
import { useSelector } from 'react-redux'
import { back } from '../features/page'

const NavigationButtons = () => {
  const page = useSelector((e) => e.page.value);
  const dispatch = useDispatch(); 
  const nextClick = () => {
    dispatch(next()); 

  };
  return (
    <div className={page === 0 ? 'navigation btnRight' : 'navigation'}>
      {page !== 0 && <button className='btn1' onClick={() => dispatch(back())}>Go Back</button>}
      {page <= 12 && <button className='btn2' onClick={nextClick}>
        Next
      </button>}
    </div>
  );
};


export default NavigationButtons