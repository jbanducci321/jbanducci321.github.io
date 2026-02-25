//event listeners
document.querySelector("#authorInfo").addEventListener("click", getAuthorInfo);
document.querySelector("#translateButton").addEventListener("click", translate);
document.querySelector("#submit").addEventListener("click", submitQuotes);

//global vars
let authorName = "";
let authorImg = "";
let quoteID = 0;
let authorBio = "";
let langChoices = [{lang:"Esperanto", abv:"ES", flag:"img/esperanto_flag.png"},
    {lang:"English",abv:"EN", flag:"img/english_flag.png"},
    {lang:"Spanish",abv:"SP", flag:"img/spanish_flag.png"},
    {lang:"French",abv:"FR", flag:"img/french_flag.png"},];

async function submitQuotes() {
    let numQuotes = document.querySelector("#getQuoteInput").value;
    document.querySelector("#quoteError").style.display = "none";
    console.log(numQuotes);
    if (numQuotes <= 0 || numQuotes > 5 || numQuotes == "") {
        document.querySelector("#quoteError").textContent = "Please enter a number between 1-5";
        document.querySelector("#quoteError").style.color = "red";
    }
    else {

    }
}

async function translate() {
    let flagDiv = document.querySelector("#flagDisplayDiv");
    let radioChecked = document.querySelector("input[name='langChoice']:checked");

    flagDiv.innerHTML = ""; //Clears any previous content

    console.log(radioChecked.value);

    let url = "https://csumb.space/api/famousQuotes/translateQuote.php?lang=" + radioChecked.value + "&quoteId=" + quoteID;
    let imageElement = document.createElement("img")
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();

        document.querySelector("#randQuote").textContent = "";
        document.querySelector("#randQuote").textContent = data.translation;

        if (radioChecked.value == "EN") {
            imageElement.src = "img/english_flag.png";
        }
        else if (radioChecked.value == "ES") {
            imageElement.src = "img/esperanto_flag.png";
        }
        else if (radioChecked.value == "SP") {
            imageElement.src = "img/spanish_flag.png";
        }
        else if (radioChecked.value == "FR") {
            imageElement.src = "img/french_flag.png";
        }

        flagDiv.append(imageElement);

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
}

function getAuthorInfo() {
    let authorDiv = document.querySelector("#authorInfoDiv");

    if (authorDiv.innerHTML != "") {
        authorDiv.innerHTML = "";
    }
    else {
        let imageElement = document.createElement("img");
        imageElement.src = authorImg;

        let divElement = document.createElement("div");
        divElement.textContent = authorBio;

        authorDiv.append(divElement);
        authorDiv.append(imageElement);
    }

}

async function getRandQuote() {

    let authorUrl = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
    try {
        const response = await fetch(authorUrl);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();

        authorImg = data.picture;
        authorName = data.firstName + " " + data.lastName;
        authorBio = data.bio;
        quoteID = data.quoteId;

        document.querySelector("#randQuote").textContent = data.quoteText;
        document.querySelector("#randQuoteAuthor").textContent = "-" + authorName;


    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
}

shuffleLangChoices();
function shuffleLangChoices() {

    langChoices = _.shuffle(langChoices); //Randomly shuffles the array

    for (let i of langChoices) {
        let radioElement = document.createElement("input")
        radioElement.type = "radio"
        radioElement.name = "langChoice"
        radioElement.value = i.abv;

        let labelElement = document.createElement("label");
        labelElement.textContent = i.lang;
        labelElement.append(radioElement);

        document.querySelector("#langRadioDisplay").append(labelElement);
    }

}

getRandQuote();