const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById("question-cont");
const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answ-btn');

let shuffleQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', ()=> {
    currentQuestionIndex++
    setNextQuestion()
});

function startGame() {
    startButton.classList.add('hide');
    shuffleQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
};

function setNextQuestion() {
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        };
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
};

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    };
};

function selectAnswer(e) {
    const chosenButton = e.target
    const correct = chosenButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtons.childern).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    (shuffleQuestions.length > currentQuestionIndex + 1) ? nextButton.classList.remove('hide') : startButton.innerText = 'Restart' && (shuffleQuestions.length > currentQuestionIndex + 1) ? nextButton.classList.remove('hide') : startButton.classList.remove('hide')
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    (correct) ? element.classList.add('correct') : element.classList.add('wrong')
}

function clearStatusClass (element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "Who invented JavaScript?",
        answers: {
            a: "Douglas Crockford",
            b: "Sheryl Sandberg",
            c: "Brendan Eich"
    },
        correctAnswer: "c"
  },
  {
        question: "Which one of these is a JavaScript package manager?",
        answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
    },
        correctAnswer: "c"
  },
  {
        question: "Which tool can you use to ensure code quality?",
        answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
    },
        correctAnswer: "d"
    }
]