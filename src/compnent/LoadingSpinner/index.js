import React from 'react';
import './index.css'
import { FadeLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
  <>
    <div className='spinner-container'>
       <FadeLoader/>
      </div>
  </>
  )
};

export default LoadingSpinner;
