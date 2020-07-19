  const header = document.querySelector(".header");
  const activeExercise = document.querySelector(".activeExercise");

  let exercisesState = {
    warmup: true,
    balance: true,
    dynamicstretching: true,
    staticstretching: true,
    core: true,
    pushup: true,
    legs: true,
    flow: true,
    back: true,
    wrist: true,
    breakdance: true,
    handstand: true,
    ankle: true,
    squat: true
  };



//SELECT ALL BUTTONS
  const selectAll = document.querySelector("#selectAll");
  const unselectAll = document.querySelector("#unselectAll");
  selectAll.addEventListener('click', function(){
    let exercisesButtons = document.querySelectorAll(".typeButton");
    exercisesButtons.forEach(function(thisExercise){
      let exType = thisExercise.id; 
      exercisesState[exType] = true;
      thisExercise.classList.add("btn-2-pressed");
      })
  });
  unselectAll.addEventListener('click', function(){
    let exercisesButtons = document.querySelectorAll(".typeButton");
    exercisesButtons.forEach(function(thisExercise){
      exercisesState[thisExercise.id] = false;
      thisExercise.classList.remove("btn-2-pressed");
      })
  });

const exercisesButtons = document.querySelectorAll(".typeButton");
exercisesButtons.forEach(function(thisExercise){
  thisExercise.addEventListener("mousedown", function(){
    thisExercise.classList.toggle("btn-2-pressed");
    let exType = thisExercise.id; 
    toggleExerciseState(exType);    
  })
  
});

function toggleExerciseState(exerciseType){
  exercisesState[exerciseType] = !exercisesState[exerciseType];
};

//Difficulty settings
let difficultyState = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
}

function toggleDifficultyState(difficulty){
  difficultyState[difficulty] = !difficultyState[difficulty];
}

const difficultyButtons = document.querySelectorAll(".difficultyButton");
difficultyButtons.forEach(function(thisDifficulty){
  thisDifficulty.addEventListener("click", function(){
    thisDifficulty.classList.toggle("btn-2-pressed");
    let exDifficulty = thisDifficulty.id; 
    exDifficulty = exDifficulty.substring(5,6);
    toggleDifficultyState(exDifficulty);    
  })
});

/////////////////////////////////////////////////////

  header.addEventListener("click", function(){

    //GET CURRENT ACTIVE TYPES ON AN ARRAY
    function filterActive(){
      let filtered = [];
      Object.entries(exercisesState).forEach(function(entry){
        if(entry[1]){
          filtered.push(entry[0])
        }
      });
      return filtered
    }

//GET CURRENT ACTIVE DIFFICULTIES ON AN ARRAY
    function filterDifficulty(){
      let currentDifficulty = [];
      Object.entries(difficultyState).forEach(function(entry){
        if(entry[1]){
          currentDifficulty.push(entry[0])
        }
      });
      return currentDifficulty
    }
    
    // let filteredExercises = 
    getSuitableExercises(filterDifficulty(),filterActive());

  })

  function updateExercise(newPictureNumber){
      activeExercise.style.backgroundImage = `url('./img/gif/Move${newPictureNumber}.gif')`; 
  };

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAWXNITaTE-w2bicM1ZXrAJzvL8QCdGufE",
    authDomain: "moveit-ef28b.firebaseapp.com",
    databaseURL: "https://moveit-ef28b.firebaseio.com",
    projectId: "moveit-ef28b",
    storageBucket: "moveit-ef28b.appspot.com",
    messagingSenderId: "480396767290",
    appId: "1:480396767290:web:933d80a80e7a634b6a8503",
    measurementId: "G-41HYL0FHPS"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database();
  
 function getSuitableExercises(difficulty, type){
  let retrievedMoves;
  let suitableExercises = []; //Should return an array of the image numbers
  
  function addSuitable(numberToAdd){
    suitableExercises.push(numberToAdd);
  }

let rootRef = database.ref('/');
rootRef.once('value', async function(snapshot){
    
    retrievedMoves = snapshot.val();
    console.log("inside db",retrievedMoves)
    // return retrievedMoves;


  Object.values(retrievedMoves).forEach(exercise => {
      
    let gifNum = exercise.fileNumber;
    let thisType = exercise.moveType;
    let thisDifficulty = exercise.moveDifficulty;
    
    let difficultyCheck = difficulty.some(function(e){
      if(thisDifficulty[0]==e){return true}
    });
  
    let typeCheck =  type.some(function(e){
      if(thisType==e){return true}
      });
      
    if (difficultyCheck&&typeCheck){   
      addSuitable(parseInt(gifNum));
    }
  });
  console.log("INSIDE ",suitableExercises);
  
  
    let randomSuitable =  Math.floor(Math.random()*(suitableExercises.length))+1;
    // console.log("Showing ", suitableExercises[randomSuitable])
    updateExercise(suitableExercises[randomSuitable]);

  })
}



// COLLAPSING STUFF

const categoryBtn = document.querySelector("#categoryBtn");
const categoryContentBtn = document.querySelector("#categoryContentBtn");
categoryBtn.addEventListener("mousedown", function(){
  categoryContentBtn.classList.toggle("hiddenBar");
})

const difficultyBtn = document.querySelector("#difficultyBtn");
const difficultyContentBtn = document.querySelector("#difficultyContentBtn");
difficultyBtn.addEventListener("mousedown", function(){
  difficultyContentBtn.classList.toggle("hiddenBar");
})
