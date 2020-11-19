  const header = document.querySelector(".header");
  const activeExercise = document.querySelector(".activeExercise");
let initialPic = 321;

  // header.addEventListener("click", function(){
  //   newMove()
  // })

function newMove(){
  // let randomNum = Math.floor(Math.random()*200)+1;
  document.querySelector("#moveName").value="";
  document.querySelector("#fileNumber").value=initialPic;
  updateExercise(initialPic);
  console.log(initialPic)
  initialPic++
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


  const postButton = document.querySelector("#postData");
  postButton.addEventListener("click", pushData);

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database();


  function pushData(){
    var moveName = document.getElementById("moveName").value;
    var fileNumber = document.getElementById("fileNumber").value;
    var moveType = document.getElementById("moveType").value;
    var moveDifficulty = document.getElementById("moveDifficulty").value;

    var dataRef = database.ref('/').push();//Generates a new child location with a randomly generated id.
    dataRef.set({
        "moveName": moveName,
        "fileNumber": fileNumber,
        "moveType": moveType,
        "moveDifficulty": moveDifficulty
    });
    newMove(); //Reload the showed moved
  }

  database.ref('/').once('value', function(snapshot){
    let a = snapshot.val();
    console.log(a);
  });




  newMove()