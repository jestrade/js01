const users = [
    { email: 'admin', password: "admin" },
    { email: 'admin2', password: "admin" },
    { email: 'admin3', password: "admin" }
];

// initial load
const onload = () => {
    const user = localStorage.getItem("user");
    if (user) {
        loadData();
    } else {
        const form = document.getElementById("form");
        form.style.display = "block";

        const results = document.getElementById("results");
        results.style.display = "none";
    }
}

const logout = () => {
    localStorage.removeItem("user");
    location.reload();
}

const login = () => {
    const message = document.getElementById("message");
    message.innerHTML = "";

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        
        loadData();
    } else {
        message.innerHTML = "not found";
    }
}

const loadData = () => {
    const form = document.getElementById("form");
        form.style.display = "none";

        const table = document.getElementById("table");
        const url = "https://pokeapi.co/api/v2/pokemon/";

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
        const results = document.getElementById("results");
        results.style.display = "block";
}