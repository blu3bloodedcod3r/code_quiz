const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-cont');
const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answ-btn');
const quizFinish = document.getElementsByClassName("quiz-finish");
const saveInitial = document.getElementsByClassName("saveInitial");
const quizFinBtn = document.getElementById('quiz-finBtn')

let score = 0;
let highScore = document.getElementsByClassName('score')
let shuffleQuestions;
let currentQuestionIndex = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion()
});

function timer() {
    timeLeft = 15;

        var timer = setInterval(function() {
            timeLeft--;
            //console.log(timer)
            document.querySelector('.time-text').innerHTML = "Time Left: " + timeLeft
            if (timeLeft === 0) {
                clearInterval(timer);
            }; 
            
        }, 1000);     
         
    startGame();
};

function startGame() {
    startButton.classList.add('hide')
    questionContainer.classList.remove('hide')
    currentQuestionIndex = 0
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    setNextQuestion();
    nextButton.classList.remove('hide')
    showQuestion();
    timer();
};

function setNextQuestion() {
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex])
};

function showQuestion(question) {
    questionEl.innerText = questions.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        };
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
        nextButton.classList.remove('hide')
    });
    for (var i=0; i < questions.length; i++) {
       if (currentQuestionIndex === questions.length) {
            clearInterval(timer)
            quizFinBtn.classList.remove('hide');
            quizFinish.classList.remove('hide');
            const gameEnd= alert("The game has ended");
        }; 
    };
};

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const chosenButton = e.target
    const correct = chosenButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtons).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide') 
    };
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
};

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
};

//function endGame () {
//    for (var i=0; i < questions.length; i++) {
//        startButton.classList.add('hide')
//        nextButton.classList.add('hide')
//    };
//};

//const highScoreEntered = alert("Your score was entered")

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