// Dark Mode
function darkMode() {
    let element = document.body;
    element.classList.toggle("dark-mode");
 }

// Quiz

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('.progressBarFull');

let currentQuestion = {};
let answers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    {   

        question: 'What is the capital of France?',
        choice1: 'Lyon',
        choice2: 'Marseille',
        choice3: 'Nice',
        choice4: 'Paris',
        answer: 4,
    },
    {
        question: 'What is the capital of Spain?',
        choice1: 'Barcelona',
        choice2: 'Madrid',
        choice3: 'Seville',
        choice4: 'Valencia',
        answer: 2,
    },
    {
        question: 'What is the capital of Italy?',
        choice1: 'Rome',
        choice2: 'Venice',
        choice3: 'Florence',
        choice4: 'Milan',
        answer: 1,
    },
    {
        question: 'What is the capital of England?',
        choice1: 'Liverpool',
        choice2: 'Birmingham',
        choice3: 'London',
        choice4: 'Manchester',
        answer: 3,
    },
    {
        question: 'What is the capital of Scotland?',
        choice1: 'Aberdeen',
        choice2: 'Glasgow',
        choice3: 'Edinburgh',
        choice4: 'Dundee',
        answer: 3,
    },
    {
        question: 'What is the capital of Japan?',
        choice1: 'Tokyo',
        choice2: 'Kyoto',
        choice3: 'Osaka',
        choice4: 'Yokohama',
        answer: 1,
    },
    {
        question: 'What is the capital of Netherlands?',
        choice1: 'Utrecht',
        choice2: 'Eindhoven',
        choice3: 'Rotterdam',
        choice4: 'Amsterdam',
        answer: 4,
    },
    {
        question: 'What is the capital of Germany?',
        choice1: 'Munich',
        choice2: 'Frankfurt',
        choice3: 'Berlin',
        choice4: 'Cologne',
        answer: 3,
    },
    {
        question: 'What is the capital of Egypt?',
        choice1: 'Alexandria',
        choice2: 'Giza',
        choice3: 'Aswan',
        choice4: 'Cairo',
        answer: 4,
    },
    {
        question: 'What is the capital of Canada?',
        choice1: 'Ottawa',
        choice2: 'Toronto',
        choice3: 'Vancouver',
        choice4: 'Montreal',
        answer: 1,
    }
]

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score);

        return window.location.assign('finish.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if (!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 100)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame();
