var zaman = 1000; //1 saniye
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started=false;
var currentLevel = 0;



setTimeout(function() {
var donut = prompt("Oyun hakkında bilgi almak istiyor musunuz? (E/H)");
if (donut == "e" || donut == "E") {
  alert("Hafızanızı test edebileceğiniz mükemmel bir oyun sizi bekliyor.\nOyunun tek bir kuralı var ekranda yanan renklere sırasıyla tıklamalısın. İyi eğlenceler!")
}

else if (donut == "h" || donut == "H" ){
    alert("İyi eğlenceler!");
};

}, zaman);

$("#level-title").click(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
      }
    });

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    console.log("succes");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      },1000);

    }

  }

 else {
  console.log("wrong");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  finishGame();
  startOver();

}}




  $(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    audio.play();
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });



function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);
}

function finishGame(){
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Oyun Bitti! Yeniden Başlamak İçin Bu Yazıya Dokun");

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
