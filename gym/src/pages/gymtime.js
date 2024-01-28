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
      <Header/>
      </div>
      
    </div>
  );
};

export default Gym;
