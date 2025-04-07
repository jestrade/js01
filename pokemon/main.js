const apiURL = "";
const pokemonAPIURL = "https://pokeapi.co/api/v2/pokemon?limit=10";

// initial load
const onload = () => {
    const token = localStorage.getItem("token");
    if (token) {
        loadData();
    } else {
        const form = document.getElementById("loginForm");
        form.style.display = "block";

        const list = document.getElementById("list");
        list.style.display = "none";
    }
}


const showRegister = () => {
    const message = document.getElementById("message");
    message.innerHTML = "";

    const form = document.getElementById("registerForm");
    form.style.display = "block";

    const list = document.getElementById("loginForm");
    list.style.display = "none";
}

const showLogin = () => {
    const message = document.getElementById("message");
    message.innerHTML = "";

    const form = document.getElementById("loginForm");
    form.style.display = "block";

    const list = document.getElementById("registerForm");
    list.style.display = "none";
}

const showList = () => {
    const message = document.getElementById("message");
    message.innerHTML = "";

    const form = document.getElementById("loginForm");
    form.style.display = "none";

    const list = document.getElementById("list");
    list.style.display = "block";
}

const logoutUser = () => {
    localStorage.removeItem("token");
    location.reload();
}

const handleLogin = async () => {
    const message = document.getElementById("message");
    message.innerHTML = "";

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        message.innerHTML = "Please enter username and password";
        message.style.color = "red";

        return;
    }

    const url = `${apiURL}/users/login`;
    const data = {
        username: username,
        password: password
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (response.ok) {
        const token = responseData?.data?.token;
        if (!token) {
            message.innerHTML = "Token not found";
            message.style.color = "red";
            return;
        }
        localStorage.setItem("token", token);
        showList();
        loadData();
    } else {
        message.innerHTML = responseData.message;
        message.style.color = "red";
    }

    document.getElementById("loginPassword").value = "";
}

const handleRegister = async () => {
    const message = document.getElementById("message");
    message.innerHTML = "";

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const passwordConfirmation = document.getElementById('passwordConfirmation').value;
    const password = document.getElementById('password').value;

    if (!email || !name || !username || !password || !passwordConfirmation) {
        message.innerHTML = "Please enter email, name, username, password and password confirmation";
        message.style.color = "red";
        return;
    }
    if (password !== passwordConfirmation) {
        message.innerHTML = "Password and password confirmation do not match";
        message.style.color = "red";
        return;
    }

    const url = `${apiURL}/users/`;

    const data = {
        name,
        email,
        username,
        password,
        passwordConfirmation
        }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        document.getElementById("email").value = "";
        document.getElementById("name").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("passwordConfirmation").value = "";

        message.innerHTML = "User created successfully";
        message.style.color = "green";
    } else {
        const responseData = await response.json();
        message.innerHTML = responseData.message;
        message.style.color = "red";
    }
}

const loadData = () => {
    const form = document.getElementById("loginForm");
        form.style.display = "none";

        const table = document.getElementById("table");
        const url = pokemonAPIURL;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemon = data.results;
            pokemon.forEach(pokemon => {
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                cell1.innerHTML = pokemon.name;
                cell2.innerHTML = pokemon.url;
            });
        });
        const list = document.getElementById("list");
        list.style.display = "block";
}