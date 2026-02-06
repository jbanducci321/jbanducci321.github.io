//event listeners
document.querySelector("#guessButton").addEventListener("click" , guess);

//Global variables
let randomNumber = Math.floor(Math.random() * 100);
let guessCount = 0;
//Generates random number between 1 and 99

function guess() {
    let userGuess = document.querySelector("#guess").value;

    document.querySelector("#userGuesses").textContent += userGuess + " ";

    //Java script color coding styles
    document.querySelector("#userGuesses").style.color = "red";
    document.querySelector("#userGuesses").style.backgroundColor = "yellow";

    if (userGuess > randomNumber) {
        document.querySelector("#displayResponse").textContent = "Guess too high";
        document.querySelector("#displayResponse").style.color = "red";
        guessCount++;
    }

    else if (userGuess < randomNumber) {
        document.querySelector("#displayResponse").textContent = "Guess too low";
        document.querySelector("#displayResponse").style.color = "blue";
        guessCount++;
    }

    else if (userGuess == randomNumber) {
        document.querySelector("#displayResponse").textContent = "You got it right!!!";
        document.querySelector("#displayResponse").style.color = "green";
        if (guessCount <= 7) {
            document.querySelector("#attemptMsg").textContent = "You got it in " + guessCount +
                " guesses. Congratulations!!!";
        }
        else {
            document.querySelector("#attemptMsg").textContent = "You got it in " + guessCount + " guesses"
        }
    }
}

