import {getFirestore, collection, addDoc, onSnapshot} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js"
const db = getFirestore();
const dbRef = collection(db, "exercises");

//----------------------------------------------------------------------
// GET DATA
//----------------------------------------------------------------------

let exercises=[];

const getExercises = async() => {

    try {
        // const docSnap = await getDocs(dbRef);
        await onSnapshot(dbRef, docsSnap => {
            
            exercises=[];

            docsSnap.forEach((doc) => {
                const exercise= doc.data();
                exercise.id= doc.id;
                exercises.push(exercise);
                
            });
            console.log(exercises);
            showExercises(exercises);
        });
    }
    catch(err) {
        console.log("getExercises =" + err);
    }
}

getExercises();

//----------------------------------------------------------------------
// DISPLAY EXERCISES TO USER
//----------------------------------------------------------------------
const exerciseList = document.getElementById("exercise-list");
const showExercises = (exercises) => {
    exerciseList.innerHTML=""

    exercises.forEach((exercise) => {

        const li = `<li class="exercise-list-item">
        <div class="media">
            <div class="emoji">🏋️</div>
        </div>
        <div class="content">
            <div class="ex-name">
                ${exercise.exercise}
            </div>
            <div class="ex-details">
                ${exercise.weight + "kgs"} ${exercise.reps + "x" + exercise.sets}
            </div>
        </div>
        <div class="action">
            <button class="edit-btnn"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 20">
                <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"></path>
            </svg></button>
            <button class="delete-btn"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
                <path d="M 21 0 C 19.354545 0 18 1.3545455 18 3 L 18 5 L 10.15625 5 A 1.0001 1.0001 0 0 0 9.8378906 5 L 8 5 A 1.0001 1.0001 0 1 0 8 7 L 9.0859375 7 L 12.705078 47.5 L 12.707031 47.509766 C 12.857262 48.862232 13.981872 50 15.400391 50 L 34.599609 50 C 36.018128 50 37.142691 48.862266 37.292969 47.509766 L 37.294922 47.5 L 40.914062 7 L 42 7 A 1.0001 1.0001 0 1 0 42 5 L 40.173828 5 A 1.0001 1.0001 0 0 0 39.841797 5 L 32 5 L 32 3 C 32 1.3545455 30.645455 0 29 0 L 21 0 z M 21 2 L 29 2 C 29.554545 2 30 2.4454545 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4454545 20.445455 2 21 2 z M 11.09375 7 L 18.832031 7 A 1.0001 1.0001 0 0 0 19.158203 7 L 30.832031 7 A 1.0001 1.0001 0 0 0 31.158203 7 L 38.90625 7 L 35.306641 47.289062 C 35.256918 47.736563 34.981091 48 34.599609 48 L 15.400391 48 C 15.018909 48 14.743082 47.736563 14.693359 47.289062 L 11.09375 7 z M 18.984375 9.9863281 A 1.0001 1.0001 0 0 0 18 11 L 18 44 A 1.0001 1.0001 0 1 0 20 44 L 20 11 A 1.0001 1.0001 0 0 0 18.984375 9.9863281 z M 24.984375 9.9863281 A 1.0001 1.0001 0 0 0 24 11 L 24 44 A 1.0001 1.0001 0 1 0 26 44 L 26 11 A 1.0001 1.0001 0 0 0 24.984375 9.9863281 z M 30.984375 9.9863281 A 1.0001 1.0001 0 0 0 30 11 L 30 44 A 1.0001 1.0001 0 1 0 32 44 L 32 11 A 1.0001 1.0001 0 0 0 30.984375 9.9863281 z"></path>
                </svg></button>
        </div>
    </li>`;

    exerciseList.innerHTML += li;
    });
}

//----------------------------------------------------------------------
// CLICK CONTACT LIST ELEMENT
//----------------------------------------------------------------------

const exerciseListClicked = (event) => {
    
}

exerciseList.addEventListener("click", exerciseListClicked);

//----------------------------------------------------------------------
// MODAL
//----------------------------------------------------------------------

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

    if(e instanceof Event) {
        if(e.target===e.currentTarget) {
            modalOverlay.style.display = "none";
        }
    }
    else{
        modalOverlay.style.display="none"
    }}

addBtn.addEventListener("click", addButtonClicked);
closeBtn.addEventListener("click", closeButtonClicked)
modalOverlay.addEventListener("click", hideModal)

//----------------------------------------------------------------------
//FORM VALIDATION
//----------------------------------------------------------------------

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

            hideModal();
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