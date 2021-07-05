//create variable to target timer element
var displayTimer = document.getElementById("display-timer")

console.log(timer); // testing target

//create variable to target start button
var buttonStart = document.getElementById("button-start-quiz");

console.log(buttonStart); //testing proper target

//add event listener to button to start the quiz
buttonStart.addEventListener("click", function (){
    window.alert("start button clicked") //testing event listener
    }

)

//create timer
//create variable to hold time
var timer = 100;

//function that will reduce total time remaining by one and display on the html using DOM
function countDown(){
    displayCount()
    console.log(timer); //change this to display in page
    timer--;
    if (timer === 0){
    clearInterval(currenTimer)
    }
}

//function that will run every second  and call function that reduce total time remaining
var currenTimer = setInterval(countDown, 1000)


//function that displays the current count on the page by using DOM targeting
function displayCount(){
    displayTimer.textContent = timer;
}


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