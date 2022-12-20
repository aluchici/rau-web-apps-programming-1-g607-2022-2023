function createAccount() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const secondPassword = document.getElementById("secondPassword");

    if (!name.value || !email.value || !password.value || !secondPassword.value) {
        alert("Please input all required information.");
    }

    const URL = "http://localhost:5607/api/v1/register";

    // dksd22132@@AA!!
    const data = {
        "name": name.value,
        "email": email.value,
        "password": password.value,
        "second_password": secondPassword.value
    }

    const params = {
        "method": "POST",
        "mode": "cors",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    };

    fetch(URL, params).then(requestFinished).then(processData).catch(displayError);
}

function requestFinished(response) {
    if (!response.ok) {
        alert("Something went wrong.")
    }
    return response.json();
}

function processData(data) {
    window.location.href = "signin.html";
}

function displayError(error) {
    alert(error.message);
}