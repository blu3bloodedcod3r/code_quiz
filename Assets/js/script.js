const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const questionContainer = document.getElementById('question-cont')
const questionEl = document.getElementById('question')
const answerButtons = document.getElementById('answ-btn')
const scores = document.getElementById('recorded_scores')

let shuffleQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide')
    setNextQuestion()
};

function timerStart(){
    startButton('clicked', setNextQuestion(), 30000)
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex])
};

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    });
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
    Array.from(answers).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide') 
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct') 
    } else {
        element.classList.add('wrong')
    }
}


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function scoreCorrect() {
    scored = 0
    for (correct in answers) {
        scored++
    }
}

const questions = [
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
]