

//Spil startes
const lowerGuessButton = document.getElementById("button_low");
const higherGuessButton = document.getElementById("button_high");
const startButton = document.getElementById("button_start");
const correctAnswer = document.getElementById("button_correct");
const computerGuess = document.getElementById("yourNumber");


//Et tilfældigt nummer generes fra computerens side af.
let attemptsNum = 0;
let randomNumber = Math.floor(Math.random() * 100 + 1);
// let newLowGuess = Math.floor(Math.random() * (randomNumber - 1) + 1);
// let newHighGuess = Math.floor(Math.random() * (randomNumber + 1) + 1);

let newLowGuess = randomNumber;
let newHighGuess = randomNumber;



console.log(randomNumber);

//Game start

function startGame() {
    startButton.addEventListener("mousedown", randomNumberStart);
}

startGame();


function randomNumberStart() {
    console.log("Game start!");
    computerGuess.textContent = `${randomNumber}`;
    higherOrLower();
}


function higherOrLower() {
    lowerGuessButton.addEventListener("mousedown", guessLower);
    higherGuessButton.addEventListener("mousedown", guessHigher);
}

//If-funktion, højere eller lavere

function guessLower() {
    console.log("Lower guess");
    attemptsNum++;

    computerGuess.textContent = `${newLowGuess}`;
    lowerGuessButton.removeEventListener("mousedown", guessLower);
    lowerGuessButton.addEventListener("mousedown", evenLowerGuess);
    //console.log(attemptsNum);
}

const evenLowerGuess = () => {
    console.log("Going lower, lower, lower");
    const lowerGuess = Math.floor(Math.random() * (newLowGuess - 1)) + 1;
    newLowGuess = lowerGuess;
    computerGuess.textContent = `${newLowGuess}`;
}

const guessHigher = () => {
    console.log("Maybe something a little higher?");
    attemptsNum++;

    computerGuess.textContent = `${newHighGuess}`;
    higherGuessButton.removeEventListener("mousedown", guessHigher);
    higherGuessButton.addEventListener("mousedown", evenHigherGuess);
}

const evenHigherGuess = () => {
    console.log("Gætter den nu også højere?");
    const higherGuess = Math.min(Math.floor(Math.random() * (100 - newHighGuess)) + newHighGuess + 1, 100);
    newHighGuess = higherGuess;
    computerGuess.textContent = `${newHighGuess}`;
}

higherOrLower();


