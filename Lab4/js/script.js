//Event listeners
document.querySelector("#zipCode").addEventListener("change", displayCity);
document.querySelector("#password").addEventListener("click", displaySuggestions);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#state").addEventListener("change", displayCounty);
document.querySelector("#password").addEventListener("keyup", checkPassLength);
document.querySelector("#submit").addEventListener("click", submitPassCheck)


function submitPassCheck() {
    let passField = document.querySelector("#password");
    let passFeedback = document.querySelector("#passFeedback");

    let enteredPassword = document.querySelector("#password").value;

    if (passField.value.length < 3) {
        passFeedback.style.display = "block";
        passFeedback.style.color = "red";
        passFeedback.textContent = "Password must be at least 3 characters";
    }
    else if (passField.value.length < 6) {
        passFeedback.style.display = "block";
        passFeedback.style.color = "red";
        passFeedback.textContent = "Password must be at least 6 characters";
    }

    if (enteredPassword != document.querySelector("#passwordRetype").value) {
        document.querySelector("#passCompare").style.display = "block";
        document.querySelector("#passCompare").style.color = "red";
        document.querySelector("#passCompare").textContent = "Passwords don't match";
    }

}

function checkPassLength() {
    let enteredPassword = document.querySelector("#password").value;

    if (enteredPassword.length < 6) {
        document.querySelector("#passFeedback").textContent = "Error: password needs to be 6 characters.";
        document.querySelector("#passFeedback").style.display = "block";
        document.querySelector("#passFeedback").style.color = "red";
    }
    else {
        document.querySelector("#passFeedback").style.display = "none";
    }

    if (enteredPassword == "") {
        document.querySelector("#passFeedback").style.display = "none";
        document.querySelector("#passCompare").style.display = "none";
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
            document.querySelector("#usernameSpan").textContent = "Username Unavailable";
            document.querySelector("#usernameSpan").style.color = "red";
        }
        else {
            document.querySelector("#usernameSpan").textContent = "Username Available";
            document.querySelector("#usernameSpan").style.color = "green";
        }

        if (document.querySelector("#username").value == "") { //Clears text if nothing is in the username field
            document.querySelector("#usernameSpan").style.display = "none";
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

    document.querySelector("#zipSpan").textContent = "";

    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    if (data == false) {
        document.querySelector("#zipSpan").textContent = "Zip code not found";
    }

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

        for (let i of data) {
            let optionEl = document.createElement("option");
            optionEl.textContent = i.state;
            document.querySelector("#state").append(optionEl);
            optionEl.value = i.usps;
        }

        //Automatically loads in AL counties to the county drop down
        document.querySelector("#state").value = "AL";
        displayCounty();

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

displayStates();