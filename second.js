var heading = document.getElementById("heading");
var p = document.getElementById("details");

window.comunicacion.inicioCorrecto(function(event, username, birthday){
    heading.innerHTML = `Welcome, ${username}!`;
    p.innerHTML = `Date of Birth: ${birthday}`
});