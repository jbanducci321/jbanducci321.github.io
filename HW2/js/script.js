//Event listeners
document.querySelector("#guessButton").addEventListener("click", checkAnswer);
document.querySelector("#nextButton").addEventListener("click", nextPoke);

//Global vars
let score = 0; //will hold number of right guesses
let totalGuesses = 0; //will track the total number of guesses (right and wrong)
let entryNum = Math.floor(Math.random() * 1000) + 1;
let pokeName = "";

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
    document.querySelector("#pokeDisplayText").style.display = "block";
    document.querySelector("#nextButton").style.display = "block";
    document.querySelector("#answerInputDiv").style.display = "none";
}

function nextPoke() {
    entryNum = Math.floor(Math.random() * 1000) + 1;
    document.querySelector("#answerInputDiv").style.display = "block";

    //Clears the current text in the divs holding HTML
    document.querySelector("#pokeDisplayImg").innerHTML = "";
    document.querySelector("#pokeDisplayText").innerHTML = "";

    document.querySelector("#pokeNameText").value = "";
    getPokeImg();
}

getPokeImg();
