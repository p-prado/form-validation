var form = document.getElementById('form-login');
var username = document.getElementById('username');
var email = document.getElementById("email");
var password = document.getElementById('password');
var birthday = document.getElementById("birthday");
var passwordErrorText = document.getElementById("passwordErrorText");
var birthdayErrorText = document.getElementById("birthdayErrorText");
var usernameErrorText = document.getElementById("usernameErrorText");
var emailErrorText = document.getElementById("emailErrorText");

var expUc = RegExp("[A-Z]");
var expLc = RegExp("[a-z]");
var expNum = RegExp("[0-9]");
var expPassword = RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");

form.addEventListener('submit', function (event) {
    event.preventDefault();
    let dateE = isDateError(birthday.value);
    let passwordE = isPasswordError(password.value);
    let usernameE = isUsernameError(username.value);
    if (!dateE && !passwordE && !usernameE) {
        try {
            window.comunicacion.registroValido(username.value, birthday.value);
        } catch (e) {
            alert(e);
        }
    }
});

function isDateError(input) {
    let today = new Date().getTime();
    let inputDate = new Date(input).getTime();
    if (inputDate > today) {
        // show validation error
        try {
            birthday.classList.add("error");
            birthdayErrorText.classList.add("error-active");
        } catch (e) {
            // No error
        }
        return true;
    } else {
        try {
            birthday.classList.remove("error");
            birthdayErrorText.classList.remove("error-active");
        } catch (e) {
            // No error
        }
        return false;
    }
}

function isPasswordError(input) {
    if (!input.match(expPassword)) {
        try {
            password.classList.add("error");
            passwordErrorText.classList.add("error-active");
        } catch (e) {
            // alert(e);
        }
        return true;
    } else {
        try {
            password.classList.remove("error");
            passwordErrorText.classList.remove("error-active");
        } catch (e) {
            // Error
        }
        return false;
    }
}

function isUsernameError(input) {
    let userError;
    window.comunicacion.verifyUser(input);
    window.comunicacion.validatedUserError(function (event, result) {
        alert(`#1. Is there any user error? ${result}`);
        userError = result;
    });

    alert("#2. PASSED");
    
    if (userError) {
        try {
            username.classList.add("error");
            usernameErrorText.classList.add("error-active");
        } catch (e) {
            // Error
        }
        return true;
    } else {
        try {
            username.classList.remove("error");
            usernameErrorText.classList.remove("error-active");
        } catch (e) {
            // 
        }
        return false;
    }
}