var questionsArr = {

};

var timer = function() {
    var seconds = 100;

    var countdown = setInterval(function() {
        var timer = document.getElementById("timer").innerHTML=
        timer = 'Time: ' + seconds; seconds--;
        if (seconds <= -1) {
            clearInterval(countdown);
            endQuiz();
        }
    }, 1000);
    console.log("Start Timer");
}

var startQuiz = function() {
    console.log("Start Quiz");
}

var endQuiz = function() {
    console.log("End Quiz")
}
document.getElementById("begin-btn").addEventListener("click", timer);

document.getElementById("begin-btn").addEventListener("click", startQuiz);