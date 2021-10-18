// setting varibles for highscore html 


var highScore = document.querySelector ("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// event to clear scores
clear.addEventListener("click", function () { 
    localStorage.clear();
    location.reload();
 });

//  gets info from local storage 

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

// gathers info from local storage 
if (allScores !== null) {
 for (var i =0; i < allScores.length; i++){
      var createLi = document.createElement("li");
      createLi.textContent = allScores[i].initials + " " + allScores[i].score;
      highScore.appendChild(createLi);
 }
}

// event listener to move to index page 

goBack.addEventListener("click", function() {
    window.location.replace("./index.html");

});