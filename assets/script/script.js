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

// seconds for timer
var seconds = 100;
// current score for highscores
var currentScore = 0;
// current question for quiz
var currentQuestion = 0;
// if quiz has ended
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

// start and play through quiz
var startQuiz = function() {
    // display current question from questionsArr
    question.textContent = questionsArr[currentQuestion].question;

    // clear instructions if current questionArr is [0]
    if (currentQuestion === 0) {
        document.getElementById('instructions').remove();
        ansList.innerHTML = '';
    }

    // for loop through questionsArr to create elements for each question
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

    // increase currentQuestion count
    currentQuestion++;
}

// Terminate quiz and display score
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

// add user's name and score to the scoreboard
var addToHighscores = function() {
    // clear webpage and create webform for user to input score
    ansList.innerHTML = '';
    var userNameInput = document.createElement('form');
    userNameInput.innerHTML = "<label for='name'>Enter your name!</label><br><input type='text' id='name' name='name'><br><input type='submit' id='highscore-submit' value='Submit Highscore'>";
    quizDiv.appendChild(userNameInput);

    // when user clicks submit the name and score is stored in localStorage and highscores array
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

// Display highscores from highscores array
var showHighscores = function() {
    // clear webpage
    quizDiv.innerHTML = '';
    ansChoiceListDiv.innerHTML = '';
    returnToQuizBtn.innerText = 'Return to Quiz';
    
    // create highscores elements
    var highscoreHeader = document.createElement('h1');
    highscoreHeader.textContent = 'Highscores';
    var highscoreUl = document.createElement('ul');
    highscoreUl.className = 'list';

    // for loop through highscores array to create elements for each
    for (var i = 0; i < highscores.length; i++) {
        var highscoreLi = document.createElement('li');
        highscoreLi.className = 'highscores';
        highscoreLi.innerText = `${highscores[i].name}: ${highscores[i].score}`

        highscoreUl.appendChild(highscoreLi);
    }

    // append created elements to the webpage for display
    quizDiv.appendChild(highscoreHeader);
    quizDiv.appendChild(highscoreUl);
}

    // retrieve highscores from localStorage for highscores array
    var getHighscores = function() {
    highscores = localStorage.getItem("highscores", highscores);

    if (!highscores) {
        return false;
    }

    highscores = JSON.parse(highscores);
}

// get highscores form localStorage on page load
getHighscores();

// when 'Start Quiz button clicked then start timer
document.getElementById("begin-btn").addEventListener("click", timer);

// when 'Start Quiz' button clicked the start quiz 
document.getElementById("begin-btn").addEventListener("click", startQuiz);

// if View Highscores or Return to Quiz button clicked then show highscores table or refresh page
document.getElementById('view-highscores').addEventListener('click', function() {
    event.preventDefault();
    debugger;
    if (returnToQuizBtn.innerText == 'Return to Quiz') {
        window.location.reload();
        return;
    }
    showHighscores();
});