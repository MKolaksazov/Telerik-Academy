let name1 = document.querySelector("#person");
let name2 = document.querySelector("#person2");
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let dbAll = JSON.parse(localStorage.getItem('database'));
var allUsers = JSON.parse(localStorage.getItem('users'));

/*
function tryUsers() {
  try {

  }
  catch(err) {
    alert(err.message);
  }
  return allUsers;
}
*/

function addUser(e) {
    if (name1.value === "" || name2.value === "" || username.value === "" || email.value === "" || password.value === "") {
        alert("Kindly complete all fields");
        return false;
    }
console.log('1st');
    let user = {
        firstname: name1.value,
        lastname : name2.value,
        username: username.value,
        email: email.value,
        password: password.value,
        money: 1000,
        database: []
    };
    let dB = {
        cards: [],
        money: 1000
    };

    if (allUsers == null) { allUsers = []; }
    allUsers.push(user);
    localStorage.setItem('users', JSON.stringify(allUsers));

    alert ('Registration completed, kindly log in');
    document.getElementById('register').style.display = 'none';
    window.location.href = "index.html";
    //e.preventDefault();
};

document.getElementById('signUpBtn').addEventListener("click", addUser);
