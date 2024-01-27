// src/components/FitCampusProfileSetup.js
import React, { useState } from 'react';

const FitCampusProfileSetup = () => {
  const [age, setAge] = useState(20);

  const handleSliderChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="bg-black text-white flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="block text-white text-5xl text-center mb-6">FitCampus</h1>
          <p className="text-yellow-500 text-lg text-center mb-4">Please enter your Details</p>
          <div className="mb-4">
            <label className="block text-yellow-500 text-sm font-bold mb-2" htmlFor="weight">Weight</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="weight"
              type="text"
              placeholder="62.5"
              name="weight"
            />
          </div>
          <div className="mb-4">
            <label className="block text-yellow-500 text-sm font-bold mb-2" htmlFor="height">Height</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="height"
              type="text"
              placeholder="175.5"
              name="height"
            />
          </div>
          <div className="mb-4">
            <label className="block text-yellow-500 text-sm font-bold mb-2" htmlFor="goalWeight">Goal Weight</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="goalWeight"
              type="text"
              placeholder="68.5"
              name="goalWeight"
            />
          </div>
          <div className="mb-4">
            <label className="flex justify-between items-center">
              <span className="text-yellow-500 text-sm font-bold">Age</span>
              <span id="ageValue" className="text-yellow-500">{age}</span>
            </label>
            <input
              className="slider"
              style={{ width: '100%' }}
              id="ageSlider"
              type="range"
              name="age"
              min="10"
              max="100"
              value={age}
              onChange={handleSliderChange}
            />
          </div>
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-yellow-500"
                name="gender"
                value="male"
                defaultChecked
              />
              <span className="ml-2 text-yellow-500">Male</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio text-yellow-500"
                name="gender"
                value="female"
              />
              <span className="ml-2 text-yellow-500">Female</span>
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FitCampusProfileSetup;
