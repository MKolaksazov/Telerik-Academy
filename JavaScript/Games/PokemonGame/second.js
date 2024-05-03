var userDB = {};
var money = 0;
var indexUser = 0;

let signIn = document.querySelector("#btn2");
signIn.addEventListener("click", () => {
    let newUsername = document.getElementById('usern');
    let newPassword = document.getElementById('pwd');

    let filArr = finalUser.filter(user =>user.usernameAll == newUsername.value && user.passwordAll == newPassword.value);
    // window.location.href = "log.html"
    console.log(filArr);
    indexUser = finalUser.findIndex(u => u.usernameAll == newUsername.value);
    userDB = filArr;
    money = userDB[0].money;
    dbCards = userDB[0].database;

    makeTable(dbCards);
    if(filArr.length > 0) {
        alert (`Welcome, you are now logged in`);
        document.getElementById('name').innerHTML = "Welcome, "+userDB[0].usernameAll+"!";
        document.getElementById('money').innerHTML = money;
        document.getElementById('login').style.display = 'none';
        document.getElementById('log').style.display = 'block';
        //location.replace("log.html");
    }
    else {
        alert('username or password incorrect');
    }
});

function login() {
  document.getElementById('login').style.display = 'block';
  document.getElementById('register').style.display = 'none';
}

function register() {
  document.getElementById('register').style.display = 'block';
  document.getElementById('login').style.display = 'none';
}

const leave = document.querySelector("#logout");

leave.addEventListener("click", () => {
    alert("Logged out");
    document.getElementById('log').style.display = 'none';

    let allUsers = {
        firstname: userDB[0].firstname,
        lastname : userDB[0].lastname,
        usernameAll: userDB[0].usernameAll,
        emailAll: userDB[0].emailAll,
        passwordAll: userDB[0].passwordAll,
        money: money,
        database: dbCards
    };
    indUser = JSON.parse(localStorage.getItem('users'));
    indUser[indexUser] = allUsers;
    localStorage.setItem('users', JSON.stringify(indUser));
    //window.location.href = "login.html";
});
