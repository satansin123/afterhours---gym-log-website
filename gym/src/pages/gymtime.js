import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  docsSnap
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

import {
  getAuth,  // Corrected import
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';

const db = getFirestore();
const auth = getAuth();
var user, dbRef;


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
  var time;
  const navigate = useNavigate();
  onAuthStateChanged(auth, async(user)=> {
    console.log("inside onAuthStateChanged")
    if(user){
        // alert("Logged In")
        getTimings();
    }
    else{
       navigate("/register")
    }
  });
  const getTimings = async()=>{
    try{
      await onSnapshot(doc(db,"gym-info","timings"),docsSnap=>{
        time=docsSnap.data()
        console.log(time.CT1)
      })
    }
    catch(e){
      console.log(e)
    }
  }
  console.log(time)
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">Gym Timings:</h2>
      <p>{time.OT1} - {time.CT1}</p>
      <p>{time.OT2} - {time.CT2}</p>
    </div>
  );
};

export default Gym;
