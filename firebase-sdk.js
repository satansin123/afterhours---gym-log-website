// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZHPQYxZgE8tT8giWprahKFLqJZ13vUOo",
  authDomain: "gym-log-74f85.firebaseapp.com",
  projectId: "gym-log-74f85",
  storageBucket: "gym-log-74f85.appspot.com",
  messagingSenderId: "814169839117",
  appId: "1:814169839117:web:ccfb23a34cba1a82276744",
  measurementId: "G-N2HFMC5ZQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);