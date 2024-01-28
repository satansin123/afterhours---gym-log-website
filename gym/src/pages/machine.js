import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Machine = () => {
  
    const handleButtonClick = (navItem) => {
        // Handle the button click, e.g., change the content based on the navItem
        console.log(`Button clicked: ${navItem}`);
      };
  return (
    <div className="flex">
        <Sidebar handleButtonClick={handleButtonClick}/>
      
    </div>
  );
};

export default Machine;
