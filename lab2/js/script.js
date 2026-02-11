//event listeners
document.querySelector("#guessButton").addEventListener("click" , guess);
document.querySelector("#playAgainButton").addEventListener("click", resetGame);

//Global variables
let randomNumber = Math.floor(Math.random() * 100);

console.log("Selected Number: " + randomNumber);

let guessCount = 0; //attempts

let totalWins = 0;
let totalLosses = 0;

document.querySelector("#wins").textContent = totalWins;
document.querySelector("#losses").textContent = totalLosses;

function guess() {
    let userGuess = Number(document.querySelector("#guess").value);

    //validate input
    if (!validateGuess(userGuess)) {
        return;
    }

    guessCount++;

    document.querySelector("#userGuesses").textContent += userGuess + " ";

    //compare guess to target
    if (userGuess == randomNumber) {
        document.querySelector("#displayResponse").textContent = "You got it right!!!";
        document.querySelector("#displayResponse").style.color = "green";

        document.querySelector("#attemptMsg").textContent =
            "You got it in " + guessCount + " attempts. Congratulations!!!";

        totalWins += 1;
        document.querySelector("#wins").textContent = totalWins;

        gameOver();
        return;
    }

    if (userGuess < randomNumber) {
        document.querySelector("#displayResponse").textContent = "Guess higher";
        document.querySelector("#displayResponse").style.color = "blue";
    } else {
        document.querySelector("#displayResponse").textContent = "Guess lower";
        document.querySelector("#displayResponse").style.color = "red";
    }

    if (guessCount == 7) {
        totalLosses += 1;
        document.querySelector("#losses").textContent = totalLosses;

        document.querySelector("#attemptMsg").textContent = "You Lost";
        document.querySelector("#attemptMsg").style.color = "darkred";

        gameOver();
    }
}

function validateGuess(userGuess) {

    if (userGuess < 1 || userGuess > 99) {
        document.querySelector("#displayResponse").textContent = "Enter a number between 1 and 99";
        document.querySelector("#displayResponse").style.color = "red";
        return false;
    }
    return true;
}

function gameOver() {
    document.querySelector("#guessButton").style.display = "none";
    document.querySelector("#playAgainButton").style.display = "inline-block";
}

function resetGame() {
    //clear previous guesses
    document.querySelector("#userGuesses").textContent = "";

    //reset attempts
    guessCount = 0;

    //generates a new random number
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Selected Number: " + randomNumber);

    //clears the input and messages
    document.querySelector("#displayResponse").textContent = "";
    document.querySelector("#attemptMsg").textContent = "";
    document.querySelector("#guess").value = "";

    //hides the reset button and shows the play button
    document.querySelector("#guessButton").style.display = "inline-block";
    document.querySelector("#playAgainButton").style.display = "none";
}

