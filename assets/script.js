// Declared variables
var score = 0;
var questionIndex = 0;


// Declared variables from ID HTML
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var main = document.querySelector("#wrapper");

// time of 60 seconds 
var secondsLeft = 60;
// Holds interval time
var holdInterval = 0;
// penalty time
var penalty = 5;
// Creates new element
var ulCreate = document.createElement("ul");

// begins timer  
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
            
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                gameOver();
                currentTime.textContent = "Time's up!🛑";
            }
        }, 1000);
    }
    startGame(questionIndex);
});

// starts game.  displays questions and choices to page: 
function startGame(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through  array
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question 
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// compares choice and answers followed by condition settings
function compare(event) {
    var element = event.target;
    
    if (element.matches("li")) {
        
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        //  if Correct 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Great job! 👍 The answer is:  " + questions[questionIndex].answer;
            // if wrong
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! 😕 The correct answer is:  " + questions[questionIndex].answer;
        }
        
    }
    // Question Index determines number question user is on
    questionIndex++;
    
    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        gameOver();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        startGame(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
    
}
// All done will append last page
function gameOver() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";
    
    // created H1 element
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    
    questionsDiv.appendChild(createH1);
    
    // created paragraph 
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    
    questionsDiv.appendChild(createP);
    
    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        
        questionsDiv.appendChild(createP2);
    }
    
    // created label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
    
    questionsDiv.appendChild(createLabel);
    
    // created input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    
    questionsDiv.appendChild(createInput);
    
    // created submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    
    questionsDiv.appendChild(createSubmit);
    
    // captures initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        
        if (initials === null) {
            
            console.log("No value entered!");
            
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./highscores.html");
        }
    });
    
}

// array of questions and choices 

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

