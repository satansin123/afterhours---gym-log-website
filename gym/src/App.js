// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import FitCampusLogin from './pages/login';
import FitCampusRegistration from './pages/signUp';
import FitCampusProfileSetup from './pages/profileSetup';
import Home2 from './pages/home2';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<FitCampusLogin />} />
        <Route path="/register" element={<FitCampusRegistration />} />
        <Route path="/profile-setup" element={<FitCampusProfileSetup />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home2 />} />
      </Routes>
    </Router>
  );
}

export default App;
