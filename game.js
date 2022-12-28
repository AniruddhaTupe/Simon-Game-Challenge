var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var numberOfClicks = 0;
var gameOver = false;


$(document).on("keydown", handleKeydown);

$(".btn").click(function () {
  if (gameOver === true) {
    playSound("wrong");
    animateGameOver();
  } else {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // console.log("User: " + userClickedPattern);
    // console.log("Game pattern: " + gamePattern);

    if (!(userChosenColour === gamePattern[numberOfClicks])) {
      gameOver = true;
      setTimeout(() => {
        $(document).on("keydown", handleKeydown);
      }, 1000);
    //   console.log("Game Over!");
      $("h1").text("Game Over, Press Any Key To Restart");
    } else {
      numberOfClicks++;

      if (numberOfClicks === gamePattern.length) {
        numberOfClicks = 0;
        // console.log("GOING GOOD!");
        setTimeout(() => {
          nextSequence();
        }, 1000);
      } 
    //   else {
    //     console.log("Choose next colour");
    //   }
    }
  }
});

function handleKeydown() {
  level = 0;
  numberOfClicks = 0;
  started = false;
  gameOver = false;
  gamePattern.splice(0, gamePattern.length);
  userClickedPattern.splice(0, userClickedPattern.length);
  if (!started) {
    started = true;
    $("h1").text("Level " + level);
    nextSequence();
  }
}

function nextSequence() {
  $(document).off("keydown");
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);

  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function animateGameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}
