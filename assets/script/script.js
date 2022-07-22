// questions array
var questionsArr = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            'Strings',
            'Booleans',
            'Alerts',
            'Numbers'
        ],
        correctAns: 'Alerts'
    },
    {
        question: 'Arrays in Javascript can be used to store:',
        answers: [
            'Numbers and strings',
            'Booleans',
            'Other arrays',
            'All of the above'
        ],
        correctAns: 'All of the above'
    },
    {
        question: 'The condition in an If/Else statement is enclosed with:',
        answers: [
            'curly brackets',
            'quotes',
            'parenthesis',
            'square brackets'
        ],
        correctAns: 'parenthesis'
    },
];
var highscores = [];

var quizDiv = document.getElementById('quiz-text');
var question = document.getElementById('question');

var ansChoiceListDiv = document.getElementById('answer-choice-list');
var ansList = document.getElementById('list');

var seconds = 100;
var currentQuestion = 0;

// timer for quiz
var timer = function() {

    var countdownTimer = setInterval(function() {
        document.getElementById('timer').innerHTML='Time: ' + seconds; seconds--;
        if (seconds < 0) {
            clearInterval(countdownTimer);
            // if timer runs out, end quiz
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

    question.textContent = questionsArr[currentQuestion].question;

    if (currentQuestion === 0) {
        document.getElementById('instructions').remove();
        ansList.innerHTML = '';
    }

    for (var i = 0; i < questionsArr[currentQuestion].answers.length ; i++) {

        var ansBtn = document.createElement('li');
        ansBtn.innerText = questionsArr[currentQuestion].answers[i];

        if (ansBtn.innerText !== questionsArr[currentQuestion].correctAns) {
            ansBtn.className = 'incorrect-answer btn';
            ansBtn.addEventListener('click', subtractTime);
            ansBtn.addEventListener('click', function() {
                ansList.innerHTML = '';

                if (currentQuestion > 2) {
                    endQuiz();
                } else {
                    startQuiz();
                }
            });
        } else {
            ansBtn.className = 'btn';
            ansBtn.addEventListener('click', function() {
                ansList.innerHTML = '';

                if (currentQuestion > 2) {
                    endQuiz();
                } else {
                    startQuiz();
                }
            });
        }

        ansList.appendChild(ansBtn);
    }

    currentQuestion++;
}

var endQuiz = function() {
    console.log("End Quiz");

    ansChoiceListDiv.innerHTML = '';
    quizDiv.innerHTML = '';

    var highscoreHeader = document.createElement('h1');
    highscoreHeader.textContent = 'Highscores';

    var highscoreUl = document.createElement('ul');
    highscoreUl.className = 'list';


    quizDiv.appendChild(highscoreHeader);
}

document.getElementById("begin-btn").addEventListener("click", timer);

document.getElementById("begin-btn").addEventListener("click", startQuiz);