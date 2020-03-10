
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  //console.log(userClickedPattern);

  $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length)-1);

});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("level"+level);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){$("."+currentColour).removeClass("pressed");},100)
}
var level =0;
var started=false;
$(document).keypress(function(){
    if (started===false)
    {
        $("#level-title").text("level 0");
        nextSequence();
        started=true;
    }})

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(nextSequence(), 1000);
  }
  }
  else 
  {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
   level=0;
   gamePattern=[];
   started=false;
}


