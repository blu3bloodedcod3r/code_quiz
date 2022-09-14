const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-cont');
const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answ-btn');
const quizFinish = document.getElementById("quizFinish");
const quizFinBtn = document.getElementById('quizFinBtn');
const saveScoreName = document.getElementById("saveScoreName");
const scoresEl = document.getElementById('score');
//console.log(saveScoreName)

let timeLeft;
let timer;
let shuffleQuestions;
let currentQuestionIndex = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion()
});

quizFinBtn.addEventListener('click', (e) => {
    let userInitials = saveScoreName.value.trim();
    saveScore(userInitials);
	saveScoreName.value = '';
    alert("Your name and score has been entered");
});

function gameTimer() {
    timeLeft = 30;

    timer = setInterval(function() {
        if (timeLeft === 0) {
            clearInterval(timer);
            alert("The game is over: you're out of time.");
            endGame();
            //console.log(timer)
        };
        timeLeft--;
        document.querySelector('.time-text').innerHTML = "Time Left: " + timeLeft;
    }, 1000);     
};

function startGame() {
    gameTimer()
    startButton.classList.add('hide')
    questionContainer.classList.remove('hide');
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    setNextQuestion();
    nextButton.classList.remove('hide')
    //showQuestion(shuffleQuestions[currentQuestionIndex]);
    //console.log(shuffleQuestions)
    
};

function setNextQuestion() {
    resetState();
    if(currentQuestionIndex < shuffleQuestions.length) {
        showQuestion(shuffleQuestions[currentQuestionIndex]);
    } else {
        clearInterval(timer);
        endGame();
    };
};

function showQuestion(question) {
    questionEl.innerHTML = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
       //if (answer.correct) {
        button.dataset.correct = answer.correct;
        //};
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
        nextButton.classList.remove('hide');
    });
};

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    answerButtons.innerHTML = '';
};

function selectAnswer(e) {
    const chosenButton = e.target;
    const correct = chosenButton.dataset.correct;
    setStatusClass(document.body, correct);
    if (correct === false) {
        timeLeft -= 5;
    };
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct === 'true') {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    };
};

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
};

function endGame () {
    //console.log(timeLeft)
    questionContainer.classList.add('hide');
    //startButton.classList.add('hide');
    //nextButton.classList.add('hide');
    quizFinish.classList.remove('hide');
    scoresEl.innerText = timeLeft;
};

function saveScore(initials) {
    const newScore = {
        initials: initials,
        score: timeLeft,
    };
    var highScoresArray = JSON.parse(localStorage.getItem('highScores'))
    if (!highScoresArray) {
        highScoresArray = [];
    };

    highScoresArray.push(newScore);

    localStorage.setItem('highScores', JSON.stringify(highScoresArray));
};

let questions = [
    {
        question: "Who invented JavaScript?",
        answers: [
            {text: "Douglas Crockford", correct: false},
            {text: "Sheryl Sandberg", correct: false},
            {text: "Brendan Eich", correct: true}
        ]
    },
  {
        question: "Which one of these is a JavaScript package manager?",
        answers: [
            { text: "Node.js", correct: false},
            { text: "TypeScript", correct: false},
            { text: "npm", correct: true},
        ]
    },
  {
        question: "Which tool can you use to ensure code quality?",
        answers: [
            { text: "Angular", correct: false},
            { text: "jQuery", correct: false},
            { text: "RequireJS", correct: false},
            { text: "ESLint", correct: true}
      ]
    }
];