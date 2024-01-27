import React, { useEffect } from 'react';
import { auth, collection, doc, setDoc, db } from '../firebase'; // Include 'db' in the import statement

import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const FitCampusRegistration = () => {
  useEffect(() => {
    const storeInput = (key, value) => localStorage.setItem(key, value);

    document.querySelectorAll('input').forEach(input => {
      input.value = localStorage.getItem(input.name) || '';
      input.addEventListener('input', () => storeInput(input.name, input.value));
    });
  }, []);

  const signUpClicked = async () => {
    var name = document.getElementById("name").value;
    var signUpEmail = document.getElementById("emailID").value;
    var signUpPassword = document.getElementById("password").value;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
  
      const user = auth.currentUser;
      updateProfile(user, {
        displayName: name,
      });
  
      const usersCollection = collection(db, 'users'); // Reference to the 'users' collection
      const userDoc = doc(usersCollection, user.uid,"information","auth"); // Reference to a specific document in the 'users' collection
      await setDoc(userDoc, {
        uid: user.uid,
        email: user.email,
        password: signUpPassword,
        name: name,
        creationTime: new Date().toISOString()
      });

      console.log(user);
      alert("Account created successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  

    return (
      <div className="bg-black text-white flex items-center justify-center flex-col h-screen">
          <h1 className="bg-gradient-to-r from-red to-yellow  text-[15vh] text-center">FitCampus</h1>
        <div className="w-full max-w-xs">
          <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              
              <div className="mb-6">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                />
              </div>
              <div className="mb-6">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="emailID"
                  type="email"
                  placeholder="Email ID"
                  name="emailID"
                />
              </div>
              <div className="mb-6">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <div className="flex items-center justify-center">
              <button
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={signUpClicked}
            >
              Register
            </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default FitCampusRegistration;
