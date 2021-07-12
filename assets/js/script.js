var remainingTime = 0;
var timer;

_resetTimer();

//-----------------------navigation functions-------------------------------------------
function goToInstructionsSlide() {
    _setActiveSlide("slide-instructions")
    _resetTimer();
}

function goToQuestionSlides() {
    _buildQuestionSlide(0);
    _startTimer(); //did it this way to be able so use clearinterval
}

function goToSubmitScoreSlide(questionIndex, choice, correctAnswer) {
    _checkQuestionAnswer(choice, correctAnswer, "answer-display");

    if (questionIndex + 1 <= 3) {
        _buildQuestionSlide(questionIndex + 1);
    } else {
        // handle last question
        _stopTimer(timer)
        _setActiveSlide("submit-score-slide")
        document.getElementById("answer-display").classList.add("hide");
        document.getElementById("submit-score-final-score").innerText = remainingTime;
    }
}

function goToHighScoreSlide() {
    _setActiveSlide("high-score-slide")
    _setHighScore("highScores", {
        initials: document.getElementById("get-initials").value,
        score: remainingTime,
    });
}

function goToHighScoreSlideFromHeader() {
    _setActiveSlide("high-score-slide");
    _stopTimer(timer);
    _resetTimer();
    _setHighScore("highScores", undefined)
}

function _setActiveSlide(slideId) {
    var slideSet = ["slide-instructions", "question-slide", "submit-score-slide", "high-score-slide"];
    for (var i = 0; i < slideSet.length; i++) {
        document.getElementById(slideSet[i]).classList.add("hide");
    }
    document.getElementById(slideId).classList.remove("hide")
}

//-----------------------score functions-------------------------------------------

function clearScores() {
    console.log("score cleared")
    localStorage.clear();
    document.getElementById("high-score-list").innerHTML = "";
}

//-----------------------Timer functions-------------------------------------------
//function that will run every second  and call function that reduce total remainingTime remaining, return remainingTime remaining
function _startTimer() {
    console.log("start timer");
    timer = setInterval(function () {
        if (remainingTime <= 0) {
            _stopTimer(timer)

            // if you reach zero go to score slide
            _setActiveSlide("submit-score-slide")
        } else {
            remainingTime--;
        }

        document.getElementById("display-timer").innerText = "time: " + remainingTime
    }, 1000);

}

function _resetTimer() {
    remainingTime = 100;
    document.getElementById("display-timer").innerText = "time: " + remainingTime
}

function _stopTimer(timer) {
    clearInterval(timer)
}

function _penaltyDeduction() {
    remainingTime -= 10
    document.getElementById("display-timer").innerText = "time: " + remainingTime
}

//-----------------------question functions-------------------------------------------
//build question based on index
function _buildQuestionSlide(questionIndex = 0) {
    var questionSet = [
        {
            question: "In the pilot episode, what did Fry do for a living before he accidentally froze himself?",
            choices: ["Fast food cashier", "Pizza delivery boy", "handy man", "Bowling alley pinsetter" ],
            correctAnswer: 1,
        }, {
            question: "What is Leela's first name",
            choices: ["Turanga", "Labarbara", "Nichelle", "Umbriel"],
            correctAnswer: 0,
        }, {
            question: "Can you name Zapp Brannigan's assistant (and Amy's boyfriend)?",
            choices: ["Ken", "Kin", "Kip", "Kif"],
            correctAnswer: 3,
        }, {
            question: "Why does Bender drink alcohol?",
            choices: ["To get drunk", "To recharge his fuel cells", "To sober up", "To boost his productivity"],
            correctAnswer: 1,
        }]

    var questionTitle = '<h2 class="quiz-slide-title">' + questionSet[questionIndex].question + '</h2>';
    var choices = '';
    for (var i = 0; i < questionSet[questionIndex].choices.length; i++) {
        choices += '<button onclick="goToSubmitScoreSlide(' + questionIndex + ',' + i + ',' + questionSet[questionIndex].correctAnswer + ')" class="btn">' + questionSet[questionIndex].choices[i] + '</button>';
    }
    var questionContent = '<div class="quiz-slide-content">' + choices + '</div>';
    document.getElementById("question-slide").innerHTML = questionTitle + questionContent;

    _setActiveSlide("question-slide")
}

function _checkQuestionAnswer(choice, correctAnswer, answerMessageContainerID) {
    var answerContainerId = document.getElementById(answerMessageContainerID)
    answerContainerId.classList.remove("hide");

    //terniary
    //condition ? return true : return false
    answerContainerId.textContent = choice !== correctAnswer ? "Wrong Answer" : "Correct Answer!";

    if (choice !== correctAnswer) {
        _penaltyDeduction()
    }
}

//-------------------------------score functions------------------------
function _setHighScore(localstorageKey, score) {
    var highScoreFromSession = localStorage.getItem(localstorageKey);

    // terniary
    highScoreFromSession = !!highScoreFromSession ? JSON.parse(highScoreFromSession) : [];

    if (!!score) {
        highScoreFromSession.push(score);
    }

    localStorage.setItem(localstorageKey, JSON.stringify(highScoreFromSession))

    var listItem = "";

    for (var i = 0; i < highScoreFromSession.length; i++) {
        listItem +=
            "<li>" + highScoreFromSession[i].initials + " - " +
            highScoreFromSession[i].score + "</li>";
    }
    document.getElementById("high-score-list").innerHTML = listItem;
}


//-------------------------------local storage functions----------------

function _getLocalStorageByKey(key) {
    var highScore = localStorage.getItem(key);

    if (!!highScore) {
        highScore = JSON.parse(highScore)
    } else {
        highScore = [];
    }

    return highScore;
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
//         timer = 100; // variable to store initial remainingTime everytime we click the start button
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
