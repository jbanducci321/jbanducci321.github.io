//Event listeners
document.querySelector("#zipCode").addEventListener("change", displayCity);
//document.querySelector().add

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
            optionEl.selected = true;
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
displayStates()