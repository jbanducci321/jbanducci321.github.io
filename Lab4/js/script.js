//Event listeners
document.querySelector("#zipCode").addEventListener("change", displayCity);
document.querySelector("#password").addEventListener("click", displaySuggestions);
document.querySelector("#submit").addEventListener("click", checkUsername);
document.querySelector("#state").addEventListener("change", displayCounty);
document.querySelector("#password").addEventListener("keyup", checkPassLength);

async function checkPassLength() {
    let enteredPassword = document.querySelector("#password").value;

    if (enteredPassword.length < 6) {
        document.querySelector("#passFeedback").textContent = "Error: password needs to be 6 characters.";
        document.querySelector("#passFeedback").style.display = "block";
        document.querySelector("#passFeedback").style.color = "red";
    }
    else {
        document.querySelector("#passFeedback").style.display = "none";
    }
}

async function displaySuggestions() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        document.querySelector("#suggestedPassword").textContent = "Suggested Password: " + data.password;
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
}

async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + username;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        if (data.available == false) {
            alert("Username already taken")
        }
        else {
            alert("Username not taken")
        }
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
}


async function displayCity(){
    let zipCode = document.querySelector("#zipCode").value;

    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;
}

async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php"

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data.state);

        for (let i of data) {
            let optionEl = document.createElement("option");
            optionEl.textContent = i.state;
            document.querySelector("#state").append(optionEl);
            optionEl.value = i.usps;
        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
}

async function displayCounty() {

    let state = document.querySelector("#state").value;

    let url = "https://csumb.space/api/countyListAPI.php?state=" + state;

    let response = await fetch(url);
    let data = await response.json();

    let countySelect = document.querySelector("#county");
    countySelect.innerHTML = ""; // clear previous counties

    for (let i of data) {
        let option = document.createElement("option");
        option.textContent = i.county;
        countySelect.append(option);
    }
}

displayStates()