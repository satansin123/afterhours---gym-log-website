import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
  } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';
  
  import {
    getAuth,  // Corrected import
    onAuthStateChanged,
  } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
  

const db = getFirestore();
const auth = getAuth();
let user, dbRef;

const WorkoutTracker = () => {
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseInput, setExerciseInput] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [repsInput, setRepsInput] = useState('');
  const [setsInput, setSetsInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      user = auth.currentUser;
      dbRef = collection(db, 'users', user.uid, 'exercise-data');
    };

    const getExercises = async () => {
      try {
        await onSnapshot(dbRef, (docsSnap) => {
          const exercises = docsSnap.docs.map((doc) => {
            const exercise = doc.data();
            exercise.id = doc.id;
            return exercise;
          });
          setExerciseList(exercises);
        });
      } catch (err) {
        console.log('getExercises =' + err);
      }
    };

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        getUserData();
        getExercises();
        alert('Logged In');
      } else {
        alert('Not logged in');
      }
    });
  }, []);

  const addExercise = async (e) => {
    e.preventDefault();

    if (exerciseInput && weightInput && repsInput && setsInput) {
      const newExercise = {
        exerciseName: exerciseInput.trim(),
        weight: weightInput.trim(),
        reps: repsInput.trim(),
        sets: setsInput.trim(),
        note: noteInput.trim(),
      };

      try {
        await addDoc(dbRef, {
          exercise: newExercise.exerciseName,
          weight: newExercise.weight,
          reps: newExercise.reps,
          sets: newExercise.sets,
          note: newExercise.note,
          date: new Date(),
        });
        setExerciseList([...exerciseList, newExercise]);
      } catch (err) {
        console.log('Error adding exercise to Firebase:', err);
      }

      setExerciseInput('');
      setWeightInput('');
      setRepsInput('');
      setSetsInput('');
      setNoteInput('');
    }
  };

  const deleteExercise = async (id) => {
    try {
      const docRef = doc(db, 'users', user.uid, 'exercise-data', id);
      await deleteDoc(docRef);
      setExerciseList((prevExercises) =>
        prevExercises.filter((exercise) => exercise.id !== id)
      );
    } catch (err) {
      console.log('Error deleting exercise from Firebase:', err);
    }
  };

  const handleButtonClick = (navItem) => {
    // Handle the button click, e.g., change the content based on the navItem
    console.log(`Button clicked: ${navItem}`);
  };
  return (
    <div className="flex bg-#252424">
        <Sidebar handleButtonClick={handleButtonClick}/>
      <div className="w-80 h-screen " aria-hidden="true"></div>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Workout Tracker</h1>
          <a href="#" className="flex items-center">
            <img className="rounded-full h-10 w-10" src="https://placehold.co/100x100" alt="User profile image placeholder" />
            <span className="ml-2">My Profile</span>
          </a>
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-6 rounded-lg bg_gray" >
              <h2 className="text-xl font-semibold mb-4">Build your Workout Routine</h2>
              <form>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={exerciseInput}
                    onChange={(e) => setExerciseInput(e.target.value)}
                    placeholder="Enter Exercise"
                    className="block w-full bg_trans border border-gray-600 rounded-md p-2"
                    required
                  />
                  <input
                    type="text"
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    placeholder="Enter Weight"
                    className="block w-full bg_trans border border-gray-600 rounded-md p-2"
                    required
                  />
                  <input
                    type="text"
                    value={repsInput}
                    onChange={(e) => setRepsInput(e.target.value)}
                    placeholder="Enter Repetitions"
                    className="block w-full bg_trans border border-gray-600 rounded-md p-2"
                    required
                  />
                  <input
                    type="text"
                    value={setsInput}
                    onChange={(e) => setSetsInput(e.target.value)}
                    placeholder="Enter Sets"
                    className="block w-full bg_trans border border-gray-600 rounded-md p-2"
                    required
                  />
                  <textarea
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Note"
                    className="block w-full bg_trans border border-gray-600 rounded-md p-2"
                  ></textarea>
                </div>
                <button onClick={addExercise} className="mt-4 bg-yellow-400 hover:bg-yellow-600 text-black py-2 px-4 rounded">
                  + Add
                </button>
              </form>
            </div>
            <div>
              {exerciseList.map((exercise, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-4">
                  <div>
                    <span className="font-semibold">{exercise.exerciseName}</span>
                    <div className="text-gray-400 text-sm">
                      <span>Weight: {exercise.weight}</span>,
                      <span>Reps: {exercise.reps}</span>,
                      <span>Sets: {exercise.sets}</span>,
                      <span>Note: {exercise.note}</span>
                    </div>
                  </div>
                  <div>
                    <a href="#" className="text-yellow-500 mr-2"><i className="fas fa-pencil-alt"></i></a>
                    <a href="#" className="text-red-500" onClick={() => deleteExercise(index)}><i className="fas fa-trash"></i></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;
