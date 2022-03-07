var highscores = JSON.parse(localStorage.getItem(highscoreArr)) || [];
var highscoreTable = document.getElementById("highscore-table")

var loadHighscore = function() {
    console.log("Highscore loaded!");
    localStorage.getItem(highscores);
}

loadHighscore();