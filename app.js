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

saveButtonClicked = ()=> {
    checkRequired([exercise, weight, reps, sets]);
    showErrorMessages(); 
    checkEmail(email);
}

const checkRequired = (inputArray) => {
    inputArray.forEach(input => {
        if(input.value.trim() === ""){
            error[input.id] = input.id +" is empty";
        }
        else{
            delete error[input.id];
        }
    });
    console.log(error);
}

const checkEmail= () => {
    const re = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if(re.test(input.value.trim())){
        delete error[input.id];
    }
    else{
        error[input.id] = input.id + " is invalid";
    }
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