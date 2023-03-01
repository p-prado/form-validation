var heading = document.getElementById("heading");
var p = document.getElementById("details");
var backButton = document.getElementById("back-button");

window.comunicacion.inicioCorrecto(function(event, username, birthday){
    heading.innerHTML = `Welcome, ${username}!`;
    p.innerHTML = `Date of Birth: ${birthday}`
});

backButton.addEventListener('click', function(){
    window.comunicacion.backToStartScreen();
});