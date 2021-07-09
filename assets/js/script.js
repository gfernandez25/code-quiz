//create variable to target div timer element
var displayTimer = document.getElementById("display-timer")
//create variable to target div answer element
var displayAnswer = document.getElementById("answer-display")

//var timer = 10;


//-----------------------navigation functions-------------------------------------------

function startQuiz() {
    _resetTimer();
    _buildQuestionSlide(0);
    _startCountdown(); //did it this way to be able so use clearinterval
}

function submitAnswer(questionIndex, choice, correctAnswer, timer) {
    _checkQuestionAnswer(choice, correctAnswer, timer);

    if (questionIndex + 1 <= 3) {
        _buildQuestionSlide(questionIndex + 1);
    } else {
        _setActiveSlide("player-score-slide")
    }
}

function submitScore() {
    _setActiveSlide("high-score-slide")
    console.log("submit score");
}

function goToInstructions() {
    _setActiveSlide("slide-instructions")
    _resetTimer();
}

function clearScores() {
    console.log("score cleared")
}


//-----------------------Timer functions-------------------------------------------

//function that will reduce total time remaining by one and display on the html using DOM
function _countDown() {
    _displayCount(timer)
    console.log(timer); //change this to display in page
    timer--;
    if (timer === -1) {
        clearInterval(currenTimer) //use this to stop set interval after 0
    }
}

//function that displays the current count on the page by using DOM targeting displaytimer above
function _displayCount(timer) {
    displayTimer.innerHTML = timer;
}

//function that will run every second  and call function that reduce total time remaining, return time remaining
function _startCountdown() {
    setInterval(_countDown, 1000);
}

function _resetTimer() {
    console.log("start timer")
    timer = 100;
}

// function to deduct time
function _penaltyDeduction(timer) {
    console.log("penalty " + timer)
    timer = timer - 10;
    return timer;

}


//-----------------------util functions-------------------------------------------
//build question based on index
function _buildQuestionSlide(questionIndex = 0) {
    var questionSet = [
        {
            question: "Question text 1",
            choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
            correctAnswer: 3,
        }, {
            question: "Question text 2",
            choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
            correctAnswer: 3,
        }, {
            question: "Question text 3",
            choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
            correctAnswer: 3,
        }, {
            question: "Question text 4",
            choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
            correctAnswer: 3,
        }]

    var questionTitle = '<h2 class="quiz-slide-title">' + questionSet[questionIndex].question + '</h2>';
    var choices = '';
    for (var i = 0; i < questionSet[questionIndex].choices.length; i++) {
        choices += '<button onclick="submitAnswer(' + questionIndex + ',' + i + ',' + questionSet[questionIndex].correctAnswer + ')" class="btn">' + questionSet[questionIndex].choices[i] + '</button>';
    }
    var questionContent = '<div class="quiz-slide-content">' + choices + '</div>';
    document.getElementById("question-slide").innerHTML = questionTitle + questionContent;

    _setActiveSlide("question-slide")
}

function _checkQuestionAnswer(choice, correctAnswer, timer) {
    if (correctAnswer === choice) {
        console.log("answered correctly")
        displayAnswer.textContent = "Correct Answer!"
    } else {
        console.log("Wrong answer")
        displayAnswer.textContent = "Wrong Answer"
        //todo: take away 10 sec from timer    should be an util
        var currentTimer = _penaltyDeduction(timer)
    }
    return currentTimer;
    //todo: show if answer is right or wrong should be an util
}

function _setActiveSlide(slideId) {
    var slideSet = ["slide-instructions", "question-slide", "player-score-slide", "high-score-slide"];
    for (var i = 0; i < slideSet.length; i++) {
        document.getElementById(slideSet[i]).classList.add("hide");
    }
    document.getElementById(slideId).classList.remove("hide")
}






//
// //create variable to target start button
// var buttonStart = document.getElementById("button-start-quiz");
//
// //variable to target hidden div to append list of questions
// var positionDiv = document.getElementById("hidden-element")
//
//
// //add event listener to button to start the quiz
// buttonStart.addEventListener("click", function () {
//         window.alert("start button clicked") //testing event listener
//         timer = 100; // variable to store initial time everytime we click the start button
//         currenTimer = startCountdown(); //did it this way to be able so use clearinterval function since it must receive a variable
//     }
// )


//
//
//
// //commet
// //create questions
//
// //logic for score
// //ask questions and provide possible answers
// //user selects possible answer
// //answer gets evaluated right or wrong
// //if right move to next question ----- if wrong move to next question and subtract 10 seconds from timer
//

// //end of game
// //all questions answered or timer reaches zero
// //user is presented with option to enter initials and submit
// //list of high scores is displayed
// //provide ability to clear all scores or go back to start
// >>>>>>> 746c71cb5978832e0d6b8a9eb61ce3c3bd3888b3
