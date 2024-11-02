var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var keyPress = true;
var level = 0;

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);


});

$(document).keydown(function () {
    if (keyPress) {
        nextSequence();
       
    }

});

$(document).on("touchstart", function() {
    if (keyPress) {
        nextSequence();
       
    }
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("."+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level: " + level);
    level++;
    keyPress = false;


}

function playSound(name) {
    var colorSound = new Audio("sounds/" + name + ".mp3");
    colorSound.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {$("." + currentColour).removeClass("pressed");}, 100);

}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    keyPress = true;
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function() {nextSequence()}, 1000);
        }
        
    }
    else {
        var wrongSound = new Audio("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function() {$("body").removeClass("game-over");}, 200);
        wrongSound.play();
        $("h1").text("Game Over. Press Any Key To Restart.");
        startOver();
    }

}

