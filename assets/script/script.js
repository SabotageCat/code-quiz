var questionsArr = {

};
var seconds = 100;

var timer = function() {
<<<<<<< HEAD
    var seconds = 100;

    var countdown = setInterval(function() {
        var timer = document.getElementById("timer").innerHTML=
        timer = 'Time: ' + seconds; seconds--;
        if (seconds <= -1) {
            clearInterval(countdown);
=======
    var timer = setInterval(function() {
        document.getElementById("timer").innerHTML='Time: 00:' + seconds; seconds--;
        if (seconds < 0) {
            clearInterval(timer);
>>>>>>> d7cb01bb344eec7f6d3d14482f156634f4496d75
            endQuiz();
        }
    }, 1000);
    console.log("Start Timer");
}

var subtractTime = function() {
    seconds = seconds - 10;
}

var startQuiz = function() {
    console.log("Start Quiz");
}

var endQuiz = function() {
    console.log("End Quiz")
}

document.getElementById("incorrect-answer").addEventListener("click", subtractTime);

document.getElementById("begin-btn").addEventListener("click", timer);

document.getElementById("begin-btn").addEventListener("click", startQuiz);