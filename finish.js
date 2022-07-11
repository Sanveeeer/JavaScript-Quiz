// Highscores

const username = document.querySelector('#username');
const saveScore = document.querySelector('#saveScore');
const finalScore = document.querySelector('#finalScore');
const recentScore = localStorage.getItem('recentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 100;

finalScore.innerText = recentScore;

