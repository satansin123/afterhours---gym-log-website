import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Gym = () => {
  
  const handleButtonClick = (navItem) => {
    // Handle the button click, e.g., change the content based on the navItem
    console.log(`Button clicked: ${navItem}`);
  };

  return (
    <div className="flex">
      <Sidebar handleButtonClick={handleButtonClick}/>
      <div className="w-80 h-screen " aria-hidden="true"></div>
      <div className="flex-1 p-6">
        <Header />
        <GymTimings />
      </div>
    </div>
  );
};

const GymTimings = () => {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">Gym Timings:</h2>
      <p>6am - 9am</p>
      <p>4pm - 8pm</p>
    </div>
  );
};

export default Gym;
