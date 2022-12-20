const userId = sessionStorage.getItem("userId");
if (userId) {
    window.location.href = "home.html";
}

function signIn() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!email.value || !password.value) {
        alert("Please fill in all required details.");
    }

    const URL = "http://localhost:5607/api/v1/authenticate";
    const data = {
        "email": email.value,
        "password": password.value
    };
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
        alert("Something went wrong.");
    }
    return response.json();
}

function processData(data) {
    // sava user info to local storage
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userEmail", data.email);

    // save data info to session storage
    sessionStorage.setItem("userId", data.id);
    sessionStorage.setItem("userEmail", data.email);

    // save data to cookies
    document.cookie = "userId=${data.id}; userEmail=${data.email}; expires=Fri 23 Dec 2022 23:59:50 UTC; path=/;"

    // redirect to home
    window.location.href = "home.html"
}

function displayError(error) {
    alert(error.message);
}