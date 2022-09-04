const startButton = document.getElementById('start')
const nextButton = document.getElementById('next')
const questionContainer = document.getElementById("question-cont")
const questionEl = document.getElementById('question')
const answerButtons = document.getElementById('answ-btn')

let shuffleQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)


function startGame() {
    startButton.classList.add('hide')
    shuffleQuestions = question.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.sataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer() {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtons.childern).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    correct ? element.classList.add('correct') : element.classList.add('wrong')
}

function clearStatusClass (element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "What is 2+2",
        answer: [
            { text: '4', correct: true},
            {text: "22", correct: false}
    ]
    }
]