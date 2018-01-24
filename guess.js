let randomNumber = Math.floor(Math.random() * 1000000) + 1;

let guesses = document.querySelector('.guesses');
let numGuesses = document.querySelector('.numGuesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');
let ub = 1000000;
let lb = 1;

let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
guessField.focus();

function checkGuess () {
    // console.log('checkGuess');
    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent += 'Previous guesses: ';
        numGuesses.textContent += 'Guess number: 0';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        numGuesses.textContent = numGuesses.textContent.substring(0, 14) + guessCount;
        setGameOver();
    } else if (guessCount === 20) {
        lastResult.textContent = '!!!GAME OVER!!!';
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lb = userGuess + 1;
            lowOrHi.textContent = `Last guess was too low!\tLower Bound is ${lb} and Upper Bound is ${ub}. Hint ${(ub + lb) /2} is the middle of those.\t${ub - lb - 1} numbers still in range. Should only take ${Math.floor(Math.log(ub-lb-1))+1} more guesses or less.`;
        } else if (userGuess > randomNumber) {
            ub = userGuess - 1;
            lowOrHi.textContent = `Last guess was too high!\tLower Bound is ${lb} and Upper Bound is ${ub}. Hint ${(ub + lb) /2} is the middle of those.\t${ub - lb - 1} numbers still in range. Should only take ${Math.floor(Math.log(ub-lb-1))+1} more guesses or less.`;
        }
    }

    // console.log('numGuesses', numGuesses);
    numGuesses.textContent = numGuesses.textContent.substring(0, 14) + guessCount;
    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame () {
    guessCount = 1;

    let resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    ub = 1000000;
    lb = 1;
    randomNumber = Math.floor(Math.random() * 1000000) + 1;
}
