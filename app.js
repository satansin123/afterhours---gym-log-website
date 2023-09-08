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

saveButtonClicked = ()=> {
    
}

saveBtn.addEventListener("click", saveButtonClicked);