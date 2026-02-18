//Event listeners
document.querySelector("#guessButton").addEventListener("click", checkAnswer);
document.querySelector("#nextButton").addEventListener("click", nextPoke);

//Global vars
let score = 0; //will hold number of right guesses
let totalGuesses = 0; //will track the total number of guesses (right and wrong)
let entryNum = Math.floor(Math.random() * 1000) + 1;
let pokeName = "";
let history = []; //array to hold the names of the past guesses

async function getPokeImg() {
    let headerNameElement;
    let imageElement;
    try {
        let url = "https://pokeapi.co/api/v2/pokemon/" + entryNum;

        let response = await fetch(url);
        let data = await response.json();


        imageElement = document.createElement("img");
        imageElement.src = data.sprites.other["official-artwork"].front_default;

        headerNameElement = document.createElement("h3");
        pokeName = data.forms[0].name
        console.log("Pokémon name: " + pokeName);
    }
    catch (error) {
        console.log(error);
    }
    headerNameElement.textContent = "This Pokémon is: " + pokeName.charAt(0).toUpperCase() + pokeName.slice(1);

    document.querySelector("#pokeDisplayImg").append(imageElement);
    document.querySelector("#pokeDisplayText").append(headerNameElement);
    document.querySelector("#pokeDisplayText").style.display = "none";
    document.querySelector("#nextButton").style.display = "none";

}

function checkAnswer() {
    //Makes the name matching case-insensitive
    let userGuess = document.querySelector("#pokeNameText").value.trim().toLowerCase();
    console.log("User guess: " + userGuess);
    let correctName = pokeName.toLowerCase();

    let feedbackDiv = document.querySelector("#pokeResult");

    totalGuesses++;//increments the total guess count

    if (userGuess == correctName) {
        feedbackDiv.textContent = "Correct";
        feedbackDiv.style.color = "green";
        score++; //Increments correct answer counter
    }
    else {
        feedbackDiv.textContent = "Wrong";
        feedbackDiv.style.color = "red";
    }

    history.push({
        correct: pokeName,
        guess: userGuess,
        isCorrect: (userGuess == correctName)
    });

    //Keeps only the 5 newest ones
    if (history.length > 5) {
        history.shift(); // removes oldest
    }

    updateHistoryDisplay();
    updateScoreBoard();

    document.querySelector("#pokeDisplayText").style.display = "block";
    document.querySelector("#nextButton").style.display = "block";
    document.querySelector("#answerInputDiv").style.display = "none";
}

function nextPoke() {
    entryNum = Math.floor(Math.random() * 1000) + 1;
    document.querySelector("#answerInputDiv").style.display = "block";
    document.querySelector("#pokeResult").textContent = "";
    //Clears the current text in the divs holding HTML
    document.querySelector("#pokeDisplayImg").innerHTML = "";
    document.querySelector("#pokeDisplayText").innerHTML = "";

    document.querySelector("#pokeNameText").value = "";
    getPokeImg();
}

function updateHistoryDisplay() {
    let historyDiv = document.querySelector("#historyDisplay");
    historyDiv.innerHTML = ""; // reset display each time


    for (let i = 0; i < history.length; i++) {
        let p = document.createElement("p");
        p.textContent = `#${i + 1}: ${history[i].guess} (Answer: ${history[i].correct})`;

        p.style.color = history[i].isCorrect ? "green" : "red";

        historyDiv.append(p);
    }
}

function updateScoreBoard() {
    let currentScore = score / totalGuesses;
    document.querySelector("#scoreBoard").textContent = "Score: " + currentScore;
}

getPokeImg();
