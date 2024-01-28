import {getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, setDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
const db = getFirestore();

const addMachineBtn = document.getElementById("add-machine-btn");
const remMachineBtn = document.getElementById("make-unavail-btn");
const setTimeBtn = document.getElementById("set-timing-btn");
const gymCloseBtn = document.getElementById("gymClosed");
console.log("running admin")

window.onload=function(){
  getMachines();
}

const dropList = document.getElementById("unavail-machine");
const getMachines = async()=>{
  try{
    dropList.innerHTML=''
    await onSnapshot(collection(db,"gym-data"),docsSnap=>{
      docsSnap.forEach((doc) => {
        const machine= doc.data();
        machine.id=doc.id;
        const option=<option>${machine.id}</option>
       dropList.innerHTML+=option 
    });
    })
  }
  catch(e){
    console.log(e)
  }
}

const addMachineClicked = async()=>{
  console.log("add machine clicked")
  const machineName = document.getElementById('machine-name').value;
  console.log(machineName)
  try{
    await setDoc(doc(db,"gym-data",machineName),{
      available:true
    });
  alert("machine added successfully")
  }
    catch(e){
      console.log(e)
      alert(e)
    }
  }

  const remMachBtnClicked = async()=>{
    const remMach = document.getElementById("unavail-machine");
    try{
      await setDoc(doc(db,"gym-data",remMach),{
        available:false
      });
    alert("machine updated successfully")
    }
      catch(e){
        console.log(e)
        alert(e)
      }
    }
  


  addMachineBtn.addEventListener("click",addMachineClicked)
  remMachineBtn.addEventListener("click",remMachBtnClicked)