
var userClickedPattern  = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var count  = true;
var level = 0;
var gamePattern = [];

// function checkAnswer(currentLevel){
//     if(userClickedPattern[0] == gamePattern[currentLevel - 1]){
//       setTimeout(function () {
//         nextSequence();
//       }, 1000);
//     }
// }




// if(count){
$(document).keypress(function(){
  if(count){
    $("#level-title").text("Level 0");
    nextSequence();
    count = false;
  }
});




function playSound(sound){

  var soundName = sound + ".mp3";
  var audio = new Audio("sounds/" + soundName);
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}




$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

  animatePress(userChosenColour);
  playSound(userChosenColour);
});


function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}






function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }

    else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}




function startOver(){
  count = true;
  level = 0;
  gamePattern = [];
}
