$(document).ready(function(){
//Trying modals ^_^
var modal = $("#myModal") ;
var gameOver = false ;

// When the user clicks on the button, open the modal 
function openModal(response) {
    $("#myModal").show();
    $("#modal-window").text(response);
}

// When the user clicks on <span> (x), close the modal
$("#close-modal").click(function() {
    $("#myModal").hide();
    if (gameOver){
        location.reload();
    }
});

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         $("#myModal").hide();
//     }
// }
//--modal script

//Question Objects go here
var Q1 = {
    q  : [1,"What is X?"],
    a1 : ["A","Wrong answer",false],
    a2 : ["B","Wrong answer",false],
    a3 : ["C","Right answer",true],
    a4 : ["D","Wrong answer",false],
    get key() { return this.a3[0] + ", " + this.a3[1] }
}

var Q2 = {
    q  : [2,"What is Y?"],
    a1 : ["A","Wrong answer",false],
    a2 : ["B","Wrong answer",false],
    a3 : ["C","Right answer",true],
    a4 : ["D","Wrong answer",false],
    get key() { return this.a3[0] + ", " + this.a3[1] }
}

var Q3 = {
    q  : [3,"What is Z?"],
    a1 : ["A","Wrong answer",false],
    a2 : ["B","Wrong answer",false],
    a3 : ["C","Right answer",true],
    a4 : ["D","Wrong answer",false],
    get key() { return  this.a3[0] + ", " + this.a3[1] }
}

var Q4 = {
    q  : [4,"What is XY?"],
    a1 : ["A","Right answer",true],
    a2 : ["B","Wrong answer",false],
    a3 : ["C","Wrong answer",false],
    a4 : ["D","Wrong answer",false],
    get key() { return  this.a3[0] + ", " + this.a3[1] }
}

var Q5 = {
    q  : [5,"What is YZ?"],
    a1 : ["A","Wrong answer",false],
    a2 : ["B","Wrong answer",false],
    a3 : ["C","Wrong answer",false],
    a4 : ["D","Right answer",true],
    get key() { return  this.a3[0] + ", " + this.a3[1] }
}

var Q6 = {
    q  : [6,"What is ZX?"],
    a1 : ["A","Wrong answer",false],
    a2 : ["B","Wrong answer",false],
    a3 : ["C","Right answer",true],
    a4 : ["D","Wrong answer",false],
    get key() { return  this.a3[0] + ", " + this.a3[1] }
}

var Q7 = {
    q  : [7,"What is ZY?"],
    a1 : ["A","Right answer",true],
    a2 : ["B","Wrong answer",false],
    a3 : ["C","Wrong answer",false],
    a4 : ["D","Wrong answer",false],
    get key() { return  this.a3[0] + ", " + this.a3[1] }
}

var Q8 = {
    q  : [8,"What is Z?"],
    a1 : ["A","Wrong answer",false],
    a2 : ["B","Wrong answer",false],
    a3 : ["C","Right answer",true],
    a4 : ["D","Wrong answer",false],
    get key() { return  this.a3[0] + ", " + this.a3[1] }
}

var Q9 = {
    q  : [9,"What is YX?"],
    a1 : ["A","Wrong answer",false],
    a2 : ["B","Wrong answer",false],
    a3 : ["C","Wrong answer",false],
    a4 : ["D","Right answer",true],
    get key() { return  this.a3[0] + ", " + this.a3[1] }
}

var Q10 = {
    q  : [10,"What is XYZ?"],
    a1 : ["A","Wrong answer",false],
    a2 : ["B","Right answer",true],
    a3 : ["C","Wrong answer",false],
    a4 : ["D","Wrong answer",false],
    get key() { return  this.a3[0] + ", " + this.a3[1] }
}

var gameArray = [Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8,Q9,Q10];
var questionHTML = "Hi";
var questionCounter = 0 ;
var playerScore = 0 ;

//Display the questions to player
function playGame(){
    
    timeCount = 15;
    startCount();

    questionHTML = `
    <div>
        <h4> Question #` + gameArray[questionCounter].q[0] + `</h4>
        <h1> ` + gameArray[questionCounter].q[1] + `</h1>
        <p>A: ` + gameArray[questionCounter].a1[1] + `</p>
        <p>B: ` + gameArray[questionCounter].a1[1] + `</p>
        <p>C: ` + gameArray[questionCounter].a1[1] + `</p>
        <p>D: ` + gameArray[questionCounter].a1[1] + `</p>
        <br>
        <button value=` + gameArray[questionCounter].a1[2] + `> Answer ` + gameArray[questionCounter].a1[0] + `</button>
        <button value=` + gameArray[questionCounter].a2[2] + `> Answer ` + gameArray[questionCounter].a2[0] + `</button>
        <br><br>
        <button value=` + gameArray[questionCounter].a3[2] + `> Answer ` + gameArray[questionCounter].a3[0] + `</button>
        <button value=` + gameArray[questionCounter].a4[2] + `> Answer ` + gameArray[questionCounter].a4[0] + `</button>
    </div>`
        
    $("#quiz-area").html(questionHTML);

    
    $("button").click(function(){
        if ( $(this).attr("value") == "true" ){
            var rightAnswer = 
                `That's right! The answer was ` + gameArray[questionCounter].key + `. You get points!` ;
            playerScore++;
            updateScorecard();
            openModal(rightAnswer);
            
            
        } else {
            var wrongAnswer = 
            `Sorry! The correct answer was ` + gameArray[questionCounter].key; + `. No points for you!` ;
            openModal(wrongAnswer);
        }    
    });
    
    //If not the last question, increment the questionCounter and advance to the next question
    //Only fires once the modal window has closed
    $("#close-modal").click(callNext);

    function callNext(){
            questionCounter++;
        if ( questionCounter < gameArray.length ){
            //Call playGame again to proceed to the next question
            playGame();        
        } else {
            var gameEnd = 
            `You completed the quiz! Your final score is ` + playerScore ;
            gameOver = true ;
            openModal(gameEnd);
        }
    }
}

//Update the scorecard
function updateScorecard(){
    $("#score-card").html(
        "<p>Your Score: " + playerScore + "/" + gameArray.length + "</p>"
    );
    
}

//show time remaining to answer question
var timeCount = 5;

    //  Variable that will hold our interval ID when we execute
    //  the "run" function
    var intervalId;


    //  The run function sets an interval

    function startCount() {
      clearInterval(intervalId);
      intervalId = setInterval(decrement, 1000);
    }

    //  The decrement function.
    function decrement() {
      timeCount--;

      //  Show the time left to answer
      $("#question-timer").text(timeCount);


      //  Once number hits zero...
      if (timeCount === 0) {
        var timeUp  = 
            `Dang, you ran out of time! The correct answer was ` 
            + gameArray[questionCounter].key; + 
            ` No points this time...` ;

        clearInterval(intervalId);
        openModal(timeUp);
      }
    }





playGame();
updateScorecard();
console.log(questionHTML);
});