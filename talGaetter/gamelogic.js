

//Spil startes
const lowerGuessButton = document.getElementById("button_low");
const higherGuessButton = document.getElementById("button_high");
const startButton = document.getElementById("button_start");
const computerGuess = document.getElementById("yourNumber");


//Et tilfældigt nummer generes fra computerens side af.
let attemptsNum = 0;
let randomNumber = Math.floor(Math.random() * 100 + 1);
let newLowGuess = Math.floor(Math.random() * (randomNumber - 1) + 1);



console.log(randomNumber);

//Game start

function startGame() {
    startButton.addEventListener("mousedown", randomNumberStart);
}

startGame();


function randomNumberStart() {
    console.log("Game start!");
    computerGuess.textContent = `${randomNumber}`;
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

//Gæt laver igen

const evenLowerGuess = () => {
    console.log("Going lower, lower, lower");
    let lowerGuess = Math.floor(Math.random() * (newLowGuess - 1) + 1);
    computerGuess.textContent = `${lowerGuess}`;
}



const guessHigher = () => {
    console.log("Maybe something a little higher?");
    attemptsNum++;
    //console.log(attemptsNum);

}

higherOrLower();

//Den prøver igen med et lavere gæt

//Den prøver igen med et højere gæt

//Tillykke, du gættede rigtigt.

// prøv igen