let card = document.querySelector('.card');
let wrapper = document.querySelector('.wrapper');

let startButton = document.querySelector('.control-play');
const workTimeSetting = document.querySelector("#work-time-setting");
const restTimeSetting = document.querySelector("#rest-time-setting");
const timeLeftDOM = document.querySelector(".time-left");




//// TIME SETTINGS
const workButtonAdd= document.querySelector(".work-time-up");
const workButtonSub= document.querySelector(".work-time-down");
const restButtonAdd= document.querySelector(".rest-time-up");
const restButtonSub= document.querySelector(".rest-time-down");

workButtonAdd.addEventListener("click", function(){
  workTimeSetting.innerHTML = parseInt(workTimeSetting.innerHTML) + 5;
  workButtonAdd.classList.toggle("clicked-button");
  setTimeout(function(){
    workButtonAdd.classList.toggle("clicked-button");
  },150)
});

workButtonSub.addEventListener("click", function(){
  if(workTimeSetting.innerHTML>0){
  workTimeSetting.innerHTML -= 5;
  }
  workButtonSub.classList.toggle("clicked-button");
  setTimeout(function(){
    workButtonSub.classList.toggle("clicked-button");
  },150)
});

restButtonAdd.addEventListener("click", function(){
  restTimeSetting.innerHTML = parseInt(restTimeSetting.innerHTML) + 5;
  restButtonAdd.classList.toggle("clicked-button");
  setTimeout(function(){
    restButtonAdd.classList.toggle("clicked-button");
  },150)
});

restButtonSub.addEventListener("click", function(){
  if(workTimeSetting.innerHTML>0){
  restTimeSetting.innerHTML -= 5;
  restButtonSub.classList.toggle("clicked-button");
  setTimeout(function(){
    restButtonSub.classList.toggle("clicked-button");
  },150)
  }
});


startButton.addEventListener("click", startTimer)


function startTimer(){
  timeLeftDOM.innerHTML = workTimeSetting.innerHTML;
  let work = setInterval(function(){
    if(timeLeftDOM.innerHTML == 0){
      clearInterval(work);
      timeLeftDOM.innerHTML = restTimeSetting.innerHTML;
      startRest();
      card.classList.toggle('is-flipped');
    } else {
    timeLeftDOM.innerHTML -= 1;
  }

  },1000);
}



function startRest(){
 let rest = setInterval(function(){
    if(timeLeftDOM.innerHTML == 0){
      clearInterval(rest);
      timeLeftDOM.innerHTML = workTimeSetting.innerHTML;
      updateExercise();
      startTimer();
      card.classList.toggle('is-flipped');
    } else {
    timeLeftDOM.innerHTML -= 1;
  
  }

  },1000);
  
}


function updateExercise(){
  let totalCards = 7;
  let chooseRandomCard = Math.floor(totalCards*Math.random())+1;
  console.log(chooseRandomCard)
  let cardFaceFront = document.querySelector(".card__face--front");
  cardFaceFront.innerHTML = "";
  cardFaceFront.style.backgroundImage = `url('./img/kitty${chooseRandomCard}.jpg')`; 

  
}