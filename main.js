const cards = document.querySelectorAll('.card');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let score = 0;
let scoreDisplay = document.getElementById("score");

// --- TIMER ---
let timerDisplay = document.getElementById("timer");
let seconds = 0;
let timerInterval = null;
let gameStarted = false;

function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        timerInterval = setInterval(() => {
            seconds++;
            let min = String(Math.floor(seconds / 60)).padStart(2, '0');
            let sec = String(seconds % 60).padStart(2, '0');
            timerDisplay.textContent = `${min}:${sec}`;
        }, 1000);
    }
}

function flipCard() {
    startTimer();
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    score++;
    scoreDisplay.textContent = score;

    resetBoard();

    checkEndGame();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}

function checkEndGame() {
    if (score === 10) {  
        clearInterval(timerInterval);
        setTimeout(() => {
            alert(`Parabéns! Você venceu em ${timerDisplay.textContent}`);
        }, 300);
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();


