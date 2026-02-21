//Event listeners
document.querySelector("#submitButton").addEventListener("click", submitQuiz);
document.querySelector("#submitButton").addEventListener("click", quizCounter);

//Global variables
let score = 0;


document.getElementById("numAttempts").innerHTML = localStorage.clickcount;

document.querySelector("#congratsDisplay").style.display = "none";

shuffleQ1Choices();
function shuffleQ1Choices() {

    let q1Choices = ["Pikachu", "Rhydon", "Arceus", "Bulbasaur", "Mew"];

    q1Choices = _.shuffle(q1Choices); //Randomly shuffles the array
    console.log(q1Choices);

    for (let i of q1Choices) {
        let radioElement = document.createElement("input")
        radioElement.type = "radio"
        radioElement.name = "q1"
        radioElement.value = i;

        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.append(radioElement);

        document.querySelector("#q1ChoicesDiv").append(labelElement);

        console.log(labelElement)
    }

}

function submitQuiz() {

    score = 0; //Resets the score for every submit

    let radioChecked = document.querySelector("input[name='q1']:checked");
    let textVal = document.querySelector("#q2").value;
    let numberVal = document.querySelector("#q3").value;
    let selectVal = document.querySelector("#q4").value;

    //clears any set images
    document.querySelector("#q1img").innerHTML = "";
    document.querySelector("#q2img").innerHTML = "";
    document.querySelector("#q3img").innerHTML = "";
    document.querySelector("#q4img").innerHTML = "";
    document.querySelector("#q5img").innerHTML = "";

    //q1
    if (radioChecked && radioChecked.value === "Rhydon") {

        document.querySelector("#q1Feedback").textContent = "Correct Answer";
        document.querySelector("#q1Feedback").style.color = "green";
        score += 20;

        let img1 = document.createElement("img");
        img1.src = "./img/correct.png";
        document.querySelector("#q1img").append(img1);

    } else {

        document.querySelector("#q1Feedback").textContent = "Wrong Answer";
        document.querySelector("#q1Feedback").style.color = "red";

        let img1 = document.createElement("img");
        img1.src = "./img/x_mark.png";
        document.querySelector("#q1img").append(img1);
    }

    //q2
    if (textVal === "Mewtwo" || textVal === "mewtwo") {

        document.querySelector("#q2Feedback").textContent = "Correct Answer";
        document.querySelector("#q2Feedback").style.color = "green";
        score += 20;

        let img2 = document.createElement("img");
        img2.src = "./img/correct.png";
        document.querySelector("#q2img").append(img2);

    } else {

        document.querySelector("#q2Feedback").textContent = "Wrong Answer";
        document.querySelector("#q2Feedback").style.color = "red";

        let img2 = document.createElement("img");
        img2.src = "./img/x_mark.png";
        document.querySelector("#q2img").append(img2);
    }

    //q3
    if (numberVal === "1996") {

        document.querySelector("#q3Feedback").textContent = "Correct Answer";
        document.querySelector("#q3Feedback").style.color = "green";
        score += 20;

        let img3 = document.createElement("img");
        img3.src = "./img/correct.png";
        document.querySelector("#q3img").append(img3);

    } else {

        document.querySelector("#q3Feedback").textContent = "Wrong Answer";
        document.querySelector("#q3Feedback").style.color = "red";

        let img3 = document.createElement("img");
        img3.src = "./img/x_mark.png";
        document.querySelector("#q3img").append(img3);
    }

    //q4
    if (selectVal === "Electric") {

        document.querySelector("#q4Feedback").textContent = "Correct Answer";
        document.querySelector("#q4Feedback").style.color = "green";
        score += 20;

        let img4 = document.createElement("img");
        img4.src = "./img/correct.png";
        document.querySelector("#q4img").append(img4);

    } else {

        document.querySelector("#q4Feedback").textContent = "Wrong Answer";
        document.querySelector("#q4Feedback").style.color = "red";

        let img4 = document.createElement("img");
        img4.src = "./img/x_mark.png";
        document.querySelector("#q4img").append(img4);
    }

    //q5
    if (document.querySelector("#q5_1").checked &&
        document.querySelector("#q5_2").checked) {

        document.querySelector("#q5Feedback").textContent = "Correct Answer";
        document.querySelector("#q5Feedback").style.color = "green";
        score += 20;

        let img5 = document.createElement("img");
        img5.src = "./img/correct.png";
        document.querySelector("#q5img").append(img5);

    } else {

        document.querySelector("#q5Feedback").textContent = "Wrong Answer";
        document.querySelector("#q5Feedback").style.color = "red";

        let img5 = document.createElement("img");
        img5.src = "./img/x_mark.png";
        document.querySelector("#q5img").append(img5);
    }

    //Display total score
    document.querySelector("#scoreDisplay").textContent = "Total score: " + score;

    if (score >= 80) {
        document.querySelector("#congratsDisplay").textContent =
            "Congratulations! You scored 80 or higher!";
        document.querySelector("#congratsDisplay").style.color = "blue";
    } else {
        document.querySelector("#congratsDisplay").textContent = "";
    }
}

function quizCounter() {
    if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount)+1;
    } else {
        localStorage.clickcount = 1;
    }
    document.querySelector("#numAttempts").innerHTML = localStorage.clickcount;
}