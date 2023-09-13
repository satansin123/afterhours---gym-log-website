import {getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js"
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

        const li = `<li class="exercise-list-item" id="${exercise.id}">
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
            <button class="edit-btn">edit</button>
            <button class="delete-btn">delete</button>
        </div>
    </li>`;

    exerciseList.innerHTML += li;
    });
}

// CLICK CONTACT LIST ELEMENT

const exerciseListClicked = (event) => {
    console.log("el click");
    const id = event.target.closest("li").getAttribute("id");
    console.log(id);

    if(event.target.className === "edit-btn") {
        editButtonClicked(id);
    }
    else if(event.target.className === "delete-btn"){
        deleteButtonClicked(id);
    }
    else {
        displayExerciseDetails(id);
    }
    displayExerciseDetails(id);
}

exerciseList.addEventListener("click", exerciseListClicked);

// EDIT DATA

const editButtonClicked = (id) => {
    modalOverlay.style.display="flex";
    const exercise = getExercise(id);
    console.log("editButtonClicked");
    console.log(exercise.exercise)
    exercisename.value = exercise.exercise;
    weight.value = exercise.weight;
    reps.value = exercise.reps;
    sets.value = exercise.sets;
    note.value = exercise.note;

    modalOverlay.setAttribute("exercise-id", exercise.id);
}

//DELETE DATA

const deleteButtonClicked = async(id) => {

    const isConfirmed = confirm("Are you sure you want to delete it?");

    if(isConfirmed) {
        try{    
            const docRef = doc(db, "exercises", id);
            await deleteDoc(docRef);
        }
        catch(err) {
            setErrorMessage("error", "Unable to delete data, please try again later");
            showErrorMessages();
        }
    }
}

//DISPLAY EXERCISE DETAILS

const getExercise = (id) => {
    return exercises.find(exercise => {
        return exercise.id ===id;
    });
}

const displayExerciseDetails = (id) => {
    const exercise = getExercise(id);
    const rightColDetail = document.getElementById("right-col-detail");
    rightColDetail.innerHTML = `
        <div class="label"> Exercise:</div>
        <div class="data"> ${exercise.exercise}</div>

        <div class="label"> Weight:</div>
        <div class="data"> ${exercise.weight}</div>

        <div class="label"> Repetitions:</div>
        <div class="data"> ${exercise.reps}</div>

        <div class="label"> Sets:</div>
        <div class="data"> ${exercise.sets}</div>

        <div class="label"> Note:</div>
        <div class="data"> ${exercise.note}</div>
    `;
}

//----------------------------------------------------------------------
// MODAL
//----------------------------------------------------------------------

const addBtn = document.querySelector(".add-btn");
const modalOverlay = document.getElementById("modal-overlay");
const closeBtn = document.querySelector(".close-btn");

const addButtonClicked=()=>{
    modalOverlay.style.display = "flex";
    modalOverlay.removeAttribute("exercise-id");
    exercisename.value = "";
    weight.value = "";
    reps.value = "";
    sets.value = "";
    note.value = "";
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


const exercisename = document.getElementById("exercise"),
    weight = document.getElementById("weight"),
    reps = document.getElementById("reps"),
    sets = document.getElementById("sets"),
    note = document.getElementById("note");

 const saveButtonClicked = async()=> {
    console.log("save clicked")
    checkRequired([exercise, weight, reps, sets]);
    showErrorMessages();

    if(Object.keys(error).length === 0) {

        if(modalOverlay.getAttribute("exercise-id")) {
            //update data
            const docRef = doc(db, "exercises", modalOverlay.getAttribute("exercise-id"));
            try{
                await updateDoc(docRef, {
                    exercise:exercisename.value,
                    weight:weight.value,
                    reps:reps.value,
                    sets:sets.value,
                    note:note.value
                });
                hideModal();
            }
            catch(err) {
                setErrorMessage("error", "Unable to update data, please try again later");
                showErrorMessages();
            }
        }
        else {
            //add data
            try{
                await addDoc(dbRef, {
                    exercise:exercisename.value,
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