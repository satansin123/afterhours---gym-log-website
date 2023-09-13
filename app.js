// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9K1IMpOjSb6G3W1pqsBEfXWpjn4RwOdw",
  authDomain: "gym-log-30c7a.firebaseapp.com",
  projectId: "gym-log-30c7a",
  storageBucket: "gym-log-30c7a.appspot.com",
  messagingSenderId: "919766881018",
  appId: "1:919766881018:web:c6685844fed38f4052af43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js"
const db = getFirestore(app);
const dbRef = collection(db, "exercises");

const addBtn = document.querySelector(".add-btn");
const modalOverlay = document.getElementById("modal-overlay");
const closeBtn = document.querySelector(".close-btn");

const addButtonClicked=()=>{
    modalOverlay.style.display = "flex";
}

const closeButtonClicked=()=>{
    modalOverlay.style.display = "none";
}

const hideModal=(e)=>{
    if(e.target===e.currentTarget)
    {
        modalOverlay.style.display = "none";
    }
}

addBtn.addEventListener("click", addButtonClicked);
closeBtn.addEventListener("click", closeButtonClicked)
modalOverlay.addEventListener("click", hideModal)

//FORM VALIDATION
const saveBtn = document.querySelector(".save-btn");
const error = {};


const exercise = document.getElementById("exercise"),
    weight = document.getElementById("weight"),
    reps = document.getElementById("reps"),
    sets = document.getElementById("sets"),
    note = document.getElementById("note");

 const saveButtonClicked = async()=> {
    console.log("save clicked")
    checkRequired([exercise, weight, reps, sets]);
    showErrorMessages();

    if(Object.keys(error).length === 0) {

        try{
            await addDoc(dbRef, {
                exercise:exercise.value,
                weight:weight.value,
                reps:reps.value,
                sets:sets.value,
                note:note.value
            });
        } 
        catch(err){
            setErrorMessage("error", "Unable to add User Data, please try again later");
            showErrorMessages();
        }
        
    }
}

const checkRequired = (inputArray) => {
    inputArray.forEach(input => {
        if(input.value.trim() === ""){
            setErrorMessage(input, input.id + " is empty")
        }
        else{
            deleteErrorMessage(input);
        }
    });
    console.log(error);
}

const setErrorMessage = (input, message) => {
    if(input.nodeName === "INPUT") {
        error[input.id] = message;
    input.style.border="1px solid red";
    }
    else {
        error[input]= message;
    }
    
}

const deleteErrorMessage = (input) => {
    delete error[input.id];
    input.style.border="1px solid green";
}


const showErrorMessages = () => {
    const errorLabel = document.getElementById("error-label");
    errorLabel.innerHTML="";
    for(const key in error) {
        const li = document.createElement("li");
        li.innerText = error[key];
        li.style.color = "red";
        errorLabel.appendChild(li);
    }
}

saveBtn.addEventListener("click", saveButtonClicked);