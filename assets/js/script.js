//create variable to target div timer element
var displayTimer = document.getElementById("display-timer")

//create variable to target start button
var buttonStart = document.getElementById("button-start-quiz");

//variable to target hidden div to append list of questions
var positionDiv = document.getElementById("hidden-element")


//add event listener to button to start the quiz
buttonStart.addEventListener("click", function () {
        window.alert("start button clicked") //testing event listener
        timer = 100; // variable to store initial time everytime we click the start button
        currenTimer = startCountdown(); //did it this way to be able so use clearinterval function since it must receive a variable
    }
)

//create container to hold answers
var answerContainerEL = document.createElement("div");
answerContainerEL.className = "question-format";
answerContainerEL.textContent = "Question 1";
positionDiv.appendChild(answerContainerEL)

// create answer button 1
var answerButtonEl1 = document.createElement("button");
answerButtonEl1.textContent = "Answer 1";
answerButtonEl1.className = "btn-answer";
answerContainerEL.appendChild(answerButtonEl1)
//answerButtonEl.setAttribute("data-task-id", taskId);

// create answer button 2
var answerButtonEl2 = document.createElement("button");
answerButtonEl2.textContent = "Answer 2";
answerButtonEl2.className = "btn-answer";
answerContainerEL.appendChild(answerButtonEl2)

// create answer button 3
var answerButtonEl3 = document.createElement("button");
answerButtonEl3.textContent = "Answer 3";
answerButtonEl3.className = "btn-answer";
answerContainerEL.appendChild(answerButtonEl3)

// create answer button 4
var answerButtonEl4 = document.createElement("button");
answerButtonEl4.textContent = "Answer 4";
answerButtonEl4.className = "btn-answer";
answerContainerEL.appendChild(answerButtonEl4)

console.log(answerContainerEL);

//function that will run every second  and call function that reduce total time remaining, return time remaining
function startCountdown() {
    var currenTimer = setInterval(countDown, 1000);
    return currenTimer;
}

//function that will reduce total time remaining by one and display on the html using DOM
function countDown() {
    displayCount(timer)
    console.log(timer); //change this to display in page
    timer--;
    if (timer === -1) {
        clearInterval(currenTimer) //use this to stop set interval after 0
    }
}

//function that displays the current count on the page by using DOM targeting displaytimer above
function displayCount(timer) {
    displayTimer.textContent = timer;
}

//commet
//create questions

//logic for score
//ask questions and provide possible answers
//user selects possible answer
//answer gets evaluated right or wrong
//if right move to next question ----- if wrong move to next question and subtract 10 seconds from timer

//end of game
//all questions answered or timer reaches zero
//user is presented with option to enter initials and submit
//list of high scores is displayed
//provide ability to clear all scores or go back to start