// Sidebar.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faWalking, faUserPlus } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ handleButtonClick }) {
  const [activeNavItem, setActiveNavItem] = useState('home');

  const handleNavButtonClick = (navItem) => {
    setActiveNavItem(navItem);
    handleButtonClick(navItem);
  };

  return (
    <div className="sidebar absolute left-0 w-64 flex flex-col bg-gray-900 shadow-lg">
      {/* Logo and nav */}
      <div className="px-5 py-4">
        <div className="text-white text-4xl font-extrabold mb-10 text-yellow-500">
          Travel
        </div>
        <nav className="flex flex-col">
          <button
            className={`nav-button mb-6 flex items-center focus:outline-none ${activeNavItem === 'home' ? 'bg-yellow-500' : 'bg-black-800'}`}
            onClick={() => handleNavButtonClick('home')}
          >
            <FontAwesomeIcon icon={faHome} className="mr-6 text-black-500" />
            Home
          </button>
          <button
            className={`nav-button mb-6 flex items-center focus:outline-none ${activeNavItem === 'about' ? 'bg-yellow-500' : 'bg-black-800'}`}
            onClick={() => handleNavButtonClick('about')}
          >
            <FontAwesomeIcon icon={faUserFriends} className="mr-6 text-black-500" />
            My Friends
          </button>
          <button
            className={`nav-button mb-6 flex items-center focus:outline-none ${activeNavItem === 'images' ? 'bg-yellow-500' : 'bg-black-800'}`}
            onClick={() => handleNavButtonClick('images')}
          >
            <FontAwesomeIcon icon={faWalking} className="mr-9 text-black-500" />
            Pedometer
          </button>
        </nav>
      </div>
      <div className="mt-auto px-5 py-1 bg-gray-700 flex items-center justify-between">
        <div>
          <button className="create-account-button text-white py-1 px-4 rounded">
            Create Account
          </button>
        </div>
        <div>
          <FontAwesomeIcon icon={faUserPlus} className="text-white text-2xl" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
