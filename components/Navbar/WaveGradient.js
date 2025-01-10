// components/WaveGradient.js
import React from 'react';

const WaveGradient = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-500 h-full">
        <div className="absolute bottom-0 left-0 right-0 h-8">
          <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current text-white"
          >
            <path
              fillOpacity="1"
              d="M0,192L80,208C160,224,320,256,480,266.7C640,277,800,267,960,250.7C1120,235,1280,213,1360,202.7L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WaveGradient;
