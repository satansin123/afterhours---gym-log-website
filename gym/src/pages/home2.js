// App.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Content from '../components/Content';

const Home2 = () => {
  return (
    <div className="container-main flex">
      <Sidebar />
      <div className="flex-1">
        
        <div className="cards-container">
          <Card
            imageSrc="nutrition.PNG"
            altText="Nutrition Tracker"
            title="Nutrition Tracker"
          />
          <Card
            imageSrc="machines.PNG"
            altText="Machine Availability"
            title="Machine Availability"
          />
          <Card
            imageSrc="workout-routine.jpg"
            altText="Your Workout Routine"
            title="Your Workout Routine"
          />
          <Card
            imageSrc="graph.PNG"
            altText="Track your progress"
            title="Track your progress..."
          />
        </div>
      </div>
    </div>
  );
};

export default Home2;
