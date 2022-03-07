// questions array
var questionsArr = [
    {
        'question' : 'Test 1',
        'answer' : 'Correct Answer',
        'bAnswer' : 'Incorrect Answer',
        'cAnswer' : 'Incorrect Answer',
        'dAnswer' : 'Incorrect Answer'
    },
    {
        'question' : 'Test 2',
        'answer' : 'Correct Answer',
        'bAnswer' : 'Incorrect Answer',
        'cAnswer' : 'Incorrect Answer',
        'dAnswer' : 'Incorrect Answer'
    },
    {
        'question' : 'Test 3',
        'answer' : 'Correct Answer',
        'bAnswer' : 'Incorrect Answer',
        'cAnswer' : 'Incorrect Answer',
        'dAnswer' : 'Incorrect Answer'
    }
];

// timer for quiz
var timer = function() {
    // 100 seconds for timer countdown
    var seconds = 100;

    //timer countdown and display
    var timer = setInterval(function() {
        document.getElementById("timer").innerHTML='Time: ' + seconds; seconds--;
        if (seconds <= 0) {
            clearInterval(timer);
            // if timer runs out, end quiz
            endQuiz();
        }
    }, 1000);
    console.log("Start Timer");
}

var startQuiz = function() {
    console.log("Start Quiz");
    // remove text of question and replace it with new text from questionsArr
    var question = document.getElementById("question");
    question.innerText = questions();
    // remove quiz instructions
    var instructions = document.getElementById("instructions");
    instructions.remove();
    // remove start quiz button
    var startBtn = document.getElementById("begin-btn");
    startBtn.remove();
    // insert questionsArr answers

}

var questions = function() {
    for (var i = 0; i < questionsArr.length; i++); {
        var createQuestions = questionsArr[i];
        createQuestions = document.innerText(createQuestions[i].question);
    }
}

var endQuiz = function() {
    console.log("End Quiz")
}
document.getElementById("begin-btn").addEventListener("click", timer);

document.getElementById("begin-btn").addEventListener("click", startQuiz);