//Event listeners
document.querySelector("#guessButton").addEventListener("click", checkAnswer);
document.querySelector("#nextButton").addEventListener("click", nextPoke);

//Global vars
let score = 0; //will hold number of right guesses
let entryNum = Math.floor(Math.random() * 151) + 1;
let pokeName = "";

async function getPokeImg() {
    let url = "https://pokeapi.co/api/v2/pokemon/" + entryNum;

    let response = await fetch(url);
    let data = await response.json();

    let imageElement = document.createElement("img");
    imageElement.src = data.sprites.front_default;

    let headerNameElement = document.createElement("h3");
    pokeName = data.forms[0].name
    headerNameElement.textContent = "The correct answer is: " + pokeName;

    document.querySelector("#pokeDisplayImg").append(imageElement);
    document.querySelector("#pokeDisplayText").append(headerNameElement);
    document.querySelector("#pokeDisplayText").style.display = "none";
    document.querySelector("#nextButton").style.display = "none";

}

function checkAnswer() {
    let userGuess = document.querySelector("#pokeNameText").value; //Grabs the user guess from the text input
    let feedbackDiv = document.querySelector("#pokeResult");

    if (userGuess == pokeName) {
        feedbackDiv.textContent = "Correct";
        feedbackDiv.style.color = "green";
    }
    else {
        feedbackDiv.textContent = "Wrong";
        feedbackDiv.style.color = "red";
    }
    document.querySelector("#pokeDisplayText").style.display = "block";
    document.querySelector("#nextButton").style.display = "block";
    document.querySelector("#answerInputDiv").style.display = "none";
}

function nextPoke() {
    entryNum = Math.floor(Math.random() * 151) + 1;
    document.querySelector("#answerInputDiv").style.display = "block";
    getPokeImg();
}

getPokeImg();
