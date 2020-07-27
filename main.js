  const header = document.querySelector(".header");
  const activeExercise = document.querySelector(".activeExercise");


function countdown(time){
  const timedownDisplay = document.querySelector("#countdownDisplay");
  if(time>=0){
  timedownDisplay.innerHTML = toMinutes(time);
  }
}

  /// Settings functionality
let settingsState = {
  rounds: 3,
  work: 25,
  rest: 15,
  roundsUpdate : null,
  workUpdate : null,
  restUpdate : null
}


//

function updateSettingsDisplay(){
  let total = settingsState.rounds*(settingsState.work+settingsState.rest);
  total = toMinutes(total)
  totalDisplay.innerHTML=total;
  roundsDisplay.innerHTML = settingsState.rounds;
  workDisplay.innerHTML = toMinutes(settingsState.work);
  restDisplay.innerHTML = toMinutes(settingsState.rest)
};

function toMinutes(sourceNum){
  var time = parseInt(sourceNum, 10); // don't forget the second param
    var hours   = Math.floor(time / 3600);
    var minutes = Math.floor((time - (hours * 3600)) / 60);
    var seconds = time - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    
    if(hours>0){
      time = hours+':'+minutes+':'+seconds;
    } else {
      time = minutes+':'+seconds;
    };
  return time
};


//Total display
const totalDisplay = document.querySelector("#totalDisplay")
// Rounds settings
const roundsDown = document.querySelector("#roundsDown");
const roundsUp = document.querySelector("#roundsUp");
const roundsDisplay = document.querySelector("#roundsDisplay");


roundsDown.addEventListener('mousedown', function(){
  if(settingsState.rounds>0){
    settingsState.rounds--;
    updateSettingsDisplay()
  };
});

roundsUp.addEventListener('mousedown', function(){
    settingsState.rounds++;
    updateSettingsDisplay()
});


// Work time settings
const workDown = document.querySelector("#workDown");
const workUp = document.querySelector("#workUp");
const workDisplay = document.querySelector("#workDisplay");

workDown.addEventListener('mousedown', function(){
  if(settingsState.work>0){
    settingsState.work-= 5;
    updateSettingsDisplay()
  };
})

workUp.addEventListener('mousedown', function(){
  settingsState.work+= 5;
  updateSettingsDisplay();
});


// Rest time settings
const restDown = document.querySelector("#restDown");
const restUp = document.querySelector("#restUp");
const restDisplay = document.querySelector("#restDisplay");

restDown.addEventListener('mousedown', function(){
  if(settingsState.rest>0){
    settingsState.rest-= 5;
    updateSettingsDisplay();
  };
})

restUp.addEventListener('mousedown', function(){
  settingsState.rest+= 5;
  updateSettingsDisplay();
});


updateSettingsDisplay();




//// Exercises selection
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



  function showNewExercise(){
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

  }


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
  
    let randomSuitable =  Math.floor(Math.random()*(suitableExercises.length))+1;
    updateExercise(suitableExercises[randomSuitable]);

  })
}



// COLLAPSING STUFF
const settingsBtn = document.querySelector("#settingsBtn");
const settingsToggleable = document.querySelector(".settingsToggleable");
const roundsCollapse = document.querySelector("#roundsCollapse");

settingsBtn.addEventListener("mousedown", function(){
  roundsCollapse.classList.toggle("collapseMinus");
  settingsToggleable.classList.toggle("hiddenBar");
});


const categoryBtn = document.querySelector("#categoryBtn");
const categoryContentBtn = document.querySelector("#categoryContentBtn");
const categoryCollapse = document.querySelector("#categoryCollapse");

categoryBtn.addEventListener("mousedown", function(){
  categoryCollapse.classList.toggle("collapseMinus");
  categoryContentBtn.classList.toggle("hiddenBar");
})

const difficultyBtn = document.querySelector("#difficultyBtn");
const difficultyContentBtn = document.querySelector("#difficultyContentBtn");
const difficultyCollapse = document.querySelector("#difficultyCollapse");

difficultyBtn.addEventListener("mousedown", function(){
  difficultyCollapse.classList.toggle("collapseMinus");
  difficultyContentBtn.classList.toggle("hiddenBar");
})






////FUNCTION START ROUND
const playWrapper = document.querySelector(".playWrapper");
const stopWrapper = document.querySelector(".stopWrapper");

const playControl = document.querySelector(".playControl");
const stopControl = document.querySelector(".stopControl");
const roundSettingsWrapper =  document.querySelector(".roundSettingsWrapper");
const categoriesWrapper =  document.querySelector(".categoriesWrapper");
const difficultyWrapper =  document.querySelector(".difficultyWrapper");

playWrapper.addEventListener('mousedown', startRound);

function startRound(){
  settingsState.roundsUpdate = settingsState.rounds;
  settingsState.workUpdate = settingsState.work;
  settingsState.restUpdate = settingsState.rest;

  activeExercise.classList.toggle("displayNone");
  roundSettingsWrapper.classList.toggle("displayNone");
  categoriesWrapper.classList.toggle("displayNone");
  difficultyWrapper.classList.toggle("displayNone");
  playControl.classList.toggle("displayNone");
  stopControl.classList.toggle("displayNone");

  showNewExercise();

setInterval(function(){
// console.log(settingsState);
if((settingsState.roundsUpdate==0)&&(settingsState.workUpdate==0)&&(settingsState.restUpdate==0 )){
  console.log("Everything is done! work complete");

} else {
  if(settingsState.workUpdate>0){ //There's working time left
  console.log("WORK NOW: ", settingsState.workUpdate);
    countdown(settingsState.workUpdate)
    settingsState.workUpdate--;
  }
  else if((settingsState.restUpdate>0)&&(settingsState.workUpdate<1)){ //No more working time. Rest time!
    // clearExercise();
    console.log("REST NOW: ", settingsState.restUpdate);
    updateExercise("asasd")
    countdown(settingsState.restUpdate);
    settingsState.restUpdate--  
  }
  else if((settingsState.roundsUpdate>0)&&(settingsState.workUpdate==0)&&(settingsState.restUpdate==0 )){ //New Round!
    console.log("NEW ROUND")
    settingsState.roundsUpdate--;
    settingsState.workUpdate = settingsState.work;
    settingsState.restUpdate = settingsState.rest;
    showNewExercise()
  }

  // showNewExercise()
  // console.log("work not complete")
}
},1000)

}
// function clearExercise(){
//   updateExercise('')
// }