var start = false;
var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.round(Math.random() * 3);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  level++;

  $("#level-title").text("Level " + level);
}


$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

  playSound(userChosenColor);
  animatePress(userChosenColor);

});


function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {

  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {

  if (!start) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }

});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to restart.");
    startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}

/* This website was created for learning purposes only.
None of the sounds belong to me and are used for learning purposes.
None of the images belong to me and are used for learning purposes.*/
