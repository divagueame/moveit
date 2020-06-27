let card = document.querySelector('.card');
let wrapper = document.querySelector('.wrapper');

let startButton = document.querySelector('.control-play');
let workTimeSetting = document.querySelector("#work-time-setting");
let restTimeSetting = document.querySelector("#rest-time-setting");
const timeLeftDOM = document.querySelector(".time-left");





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
  cardFaceFront.style.backgroundImage = `url('./img/kitty${chooseRandomCard}.jpg')`; 

  
}