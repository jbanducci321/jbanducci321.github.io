// Event Listeners
// document.querySelector("#submitBtn").addEventListener("click", displayBackground);
document.querySelector("#bgSelect").addEventListener("change", displayBackground);

async function displayBackground() {
    let background = document.querySelector("#bgSelect").value;
    let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q="+background;
    let res = await fetch(url);
    let data = await res.json();

    console.log(data);
    console.log(data.hits[0].webformatURL);

    let rand = Math.floor(Math.random() * 50);

    let bgImage = data.hits[rand].webformatURL
    document.querySelector("body").style.backgroundImage = `url('${bgImage}')`;
}

randomBackground()
async function randomBackground() {
    let background = $("#bgSelect")
    let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=random"
    let res = await fetch(url)
    let data = await res.json()

    console.log(data)

    let rand = Math.floor(Math.random() * 50)

    let bgImage = data.hits[rand].webformatURL
    $("body").style.backgroundImage = `url('${bgImage}')`
}

randomOptions();
function randomOptions() {
    let optionsArray = ["Ocean", "Mountains", "Space", "Clouds", "Flowers"];

    optionsArray = _.shuffle(optionsArray);

    for (let i = 0; i < optionsArray.length; i++) {
        let option = document.createElement("option");
        option.textContent = optionsArray[i];
        option.value = optionsArray[i].toLowerCase();

        document.querySelector("#bgSelect").append(option);
    }

    let base = document.createElement("option");
    base.textContent = "Select One";
    base.value = "none";
    $("#bgSelect").prepend(base);
    base.selected = true;
}

function $(O) {
    return document.querySelector(O);
}