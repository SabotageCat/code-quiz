var questionsArr = {

};

var timer = function() {
    var seconds = 100;

    var timer = setInterval(function() {
        document.getElementById("timer").innerHTML='Time: 00:' + seconds; seconds--;
        if (seconds <= 0) {
            clearInterval(timer);
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