let name1 = document.querySelector("#person");
let name2 = document.querySelector("#person2");
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let finalUser = JSON.parse(localStorage.getItem('users'));
let dbAll = JSON.parse(localStorage.getItem('database'));

function addUser(e) {
    if (name1.value === "" || name2.value === "" || username.value === "" || email.value === "" || password.value === "") {
        alert("Kindly complete all fields");
        return false;
    }
console.log('1st');
    let allUsers = {
        firstname: name1.value,
        lastname : name2.value,
        usernameAll: username.value,
        emailAll: email.value,
        passwordAll: password.value,
        money: 1000,
        database: []
    };
    let allDB = {
        cards: [],
        money: 1000
    };
    let indUser=[];
    if (localStorage.getItem('users') == null) {
        indUser.push(allUsers);
        localStorage.setItem('users', JSON.stringify(indUser));
    }
    else {
        indUser = JSON.parse(localStorage.getItem('users'));
        indUser.push(allUsers);
        localStorage.setItem('users', JSON.stringify(indUser));
    }
    console.log(indUser);
    alert ('Registration completed, kindly log in');
    document.getElementById('register').style.display = 'none';
    //window.location.href = "login.html";
    e.preventDefault();
};

const makeUser = document.getElementById('signUpBtn');

makeUser.addEventListener("click", addUser);
