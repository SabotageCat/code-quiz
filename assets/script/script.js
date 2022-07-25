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
var returnToQuizBtn = document.getElementById('view-highscores');

var quizDiv = document.getElementById('quiz-text');
var question = document.getElementById('question');

var ansChoiceListDiv = document.getElementById('answer-choice-list');
var ansList = document.getElementById('list');

var ansFeedbackDiv = document.getElementById('answer-feedback');
var correctChoice = document.getElementById('correct');
var incorrectChoice = document.getElementById('incorrect');

var seconds = 100;
var currentScore = 0;
var currentQuestion = 0;
var quizEnd = false;

// timer for quiz
var timer = function() {

    var countdownTimer = setInterval(function() {
        document.getElementById('timer').innerHTML='Time: ' + seconds;

        if (seconds <= 0) {
            clearInterval(countdownTimer);
            // if timer runs out, end quiz
            endQuiz();
        } else if (quizEnd) {
            clearInterval(countdownTimer);
        } else {
            seconds--;
        }
    }, 1000);
    console.log("Start Timer");
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
            ansBtn.addEventListener('click', function() {
                ansList.innerHTML = '';
                incorrectChoice.removeAttribute('hidden');
                correctChoice.setAttribute('hidden', 'true');

                currentScore -= 5;
                seconds -= 10;

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
                correctChoice.removeAttribute('hidden');
                incorrectChoice.setAttribute('hidden', 'true');

                currentScore += 10;

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

    // clear screen
    ansList.innerHTML = '';
    quizDiv.innerHTML = '';
    correctChoice.setAttribute('hidden', 'true');
    incorrectChoice.setAttribute('hidden', 'true');

    // display score
    var score = document.createElement('h1');
    currentScore = currentScore + seconds;
    score.innerText = `Your Score: ${currentScore}!`;
    quizDiv.appendChild(score);

    // display restart button to refresh page
    var restartButton = document.createElement('li');
    restartButton.className = 'btn';
    restartButton.innerText = 'Try Again';
    restartButton.addEventListener('click', function() {
        window.location.reload();
    });
    ansList.appendChild(restartButton);

    // display add to highscore button if score high enough
    var highscoreButton = document.createElement('li');
    highscoreButton.className = 'btn';
    highscoreButton.innerText = 'Add to HighScore';
    highscoreButton.addEventListener('click', function() {
        addToHighscores();
    });
    if (highscores.length < 3 || currentScore > highscores[2].score) {
        ansList.appendChild(highscoreButton);
    }

    quizEnd = true;
}

var addToHighscores = function() {
    ansList.innerHTML = '';
    var userNameInput = document.createElement('form');
    userNameInput.innerHTML = "<label for='name'>Enter your name!</label><br><input type='text' id='name' name='name'><br><input type='submit' id='highscore-submit' value='Submit Highscore'>";
    quizDiv.appendChild(userNameInput);

    document.getElementById('highscore-submit').addEventListener('click', function() {
        event.preventDefault();

        var highscore = {
            name: document.getElementById('name').value,
            score: currentScore
        };

        highscores.unshift(highscore);

        // store in localStorage and and then display highscores
        localStorage.setItem('highscores', JSON.stringify(highscores));
        showHighscores();
    });
}

var showHighscores = function() {
    quizDiv.innerHTML = '';
    ansChoiceListDiv.innerHTML = '';
    returnToQuizBtn.innerText = 'Return to Quiz';

    var highscoreHeader = document.createElement('h1');
    highscoreHeader.textContent = 'Highscores';

    var highscoreUl = document.createElement('ul');
    highscoreUl.className = 'list';

    for (var i = 0; i < highscores.length; i++) {
        var highscoreLi = document.createElement('li');
        highscoreLi.className = 'highscores';
        highscoreLi.innerText = `${highscores[i].name}: ${highscores[i].score}`

        highscoreUl.appendChild(highscoreLi);
    }

    quizDiv.appendChild(highscoreHeader);
    quizDiv.appendChild(highscoreUl);
}

var getHighscores = function() {
    highscores = localStorage.getItem("highscores", highscores);

    if (!highscores) {
        return false;
    }

    highscores = JSON.parse(highscores);
}

getHighscores();

document.getElementById("begin-btn").addEventListener("click", timer);

document.getElementById("begin-btn").addEventListener("click", startQuiz);

document.getElementById('view-highscores').addEventListener('click', function() {
    event.preventDefault();
    debugger;
    if (returnToQuizBtn.innerText == 'Return to Quiz') {
        window.location.reload();
        return;
    }
    showHighscores();
});