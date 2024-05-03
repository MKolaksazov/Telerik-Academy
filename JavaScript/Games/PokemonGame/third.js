const leave = document.querySelector("#logout");

leave.addEventListener("click", () => {
    alert("Logged out");
    window.location.href = "login.html";
});

