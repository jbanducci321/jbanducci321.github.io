//Event listeners
document.querySelector("button").addEventListener("click", submitQuiz)

//Global variables
let score = 0;

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
    let radioVal = document.querySelector("input[name='q1']:checked").value;
    let textVal = document.querySelector("#q2").value;
    let numberVal = document.querySelector("#q3").value;
    let selectVal = document.querySelector("#q4").value;

    //For question 1
    if (radioVal == "Rhydon") {
        document.querySelector("#q1Feedback").textContent = "Correct Answer";
        document.querySelector("#q1Feedback").style.color = "green";
        score += 20;
    }
    else {
        document.querySelector("#q1Feedback").textContent = "Wrong Answer";
        document.querySelector("#q1Feedback").style.color = "red";
    }

    //For question 2
    if (textVal == "Mewtwo" || textVal == "mewtwo") {
        document.querySelector("#q2Feedback").textContent = "Correct Answer";
        document.querySelector("#q2Feedback").style.color = "green";
        score += 20;
    }
    else {
        document.querySelector("#q2Feedback").textContent = "Wrong Answer";
        document.querySelector("#q2Feedback").style.color = "red";
    }

    //For question 3
    if (numberVal == "1996") {
        document.querySelector("#q3Feedback").textContent = "Correct Answer";
        document.querySelector("#q3Feedback").style.color = "green";
        score += 20;
    }
    else {
        document.querySelector("#q3Feedback").textContent = "Wrong Answer";
        document.querySelector("#q3Feedback").style.color = "red";
    }

    //For question 4
    if (selectVal == "Electric") {
        document.querySelector("#q4Feedback").textContent = "Correct Answer";
        document.querySelector("#q4Feedback").style.color = "green";
        score += 20;
    }
    else {
        document.querySelector("#q4Feedback").textContent = "Wrong Answer";
        document.querySelector("#q4Feedback").style.color = "red";
    }

    //For question 5
    if (document.querySelector("#q5_1").checked || document.querySelector("#q5_2").checked) {
        document.querySelector("#q5Feedback").textContent = "Correct Answer";
        document.querySelector("#q5Feedback").style.color = "green";
        score += 20;
    }
    else {
        document.querySelector("#q5Feedback").textContent = "Wrong Answer";
        document.querySelector("#q5Feedback").style.color = "red";
    }

    //Score stuff
    document.querySelector("#scoreDisplay").textContent = "Total score: " + score;
}