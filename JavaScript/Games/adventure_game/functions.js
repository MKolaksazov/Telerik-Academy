var userDB = {};
var money = 0;
var userID = 0;

document.querySelector("#btn2").addEventListener("click", () => {
    let enterUsername = document.getElementById('usern');
    let enterPassword = document.getElementById('pwd');

    let filteredUsers = allUsers.filter(user => user.username == enterUsername.value && user.password == enterPassword.value);

    userID = allUsers.findIndex(u => u.username == enterUsername.value);
    userDB = filteredUsers;
    money = userDB[0].money;
    dbCards = userDB[0].database;

    makeTable(dbCards);
    if(filteredUsers.length > 0) {
        alert (`Welcome, you are now logged in`);
        document.getElementById('name').innerHTML = "Welcome, "+userDB[0].username+"!";
        document.getElementById('money').innerHTML = money;
        document.getElementById('login').style.display = 'none';
        document.getElementById('log').style.display = 'block';
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

document.querySelector("#logout").addEventListener("click", () => {
    alert("Logged out");
    document.getElementById('log').style.display = 'none';

    let user = {
        firstname: userDB[0].firstname,
        lastname : userDB[0].lastname,
        username: userDB[0].username,
        email: userDB[0].email,
        password: userDB[0].password,
        money: money,
        database: dbCards
    };

    allUsers[userID] = user;
    localStorage.setItem('users', JSON.stringify(allUsers));
});
