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
    // Reset username control styles before making checks again.
    username.classList.remove("error");
    usernameErrorText.classList.remove("error-active");
    // Validate date and password
    let dateE = isDateError(birthday.value);
    let passwordE = isPasswordError(password.value);
    if (!dateE && !passwordE) {
        // If both checks pass, validate username.
        checkUsernameAndLoad(username.value)
    }
});

// Function to validate Date
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

// Function to validate Password
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

// Function to validate username and, if it validates, load the welcome screen.
function checkUsernameAndLoad(input) {
    let userError;
    let returnResult;
    window.comunicacion.verifyUser(input);

    window.comunicacion.validatedUserError(function (event, result) {
        userError = result;
        if (userError) {
            try {
                username.classList.add("error");
                usernameErrorText.classList.add("error-active");
            } catch (e) {
                // Error
            }
        } else {
            try {
                username.classList.remove("error");
                usernameErrorText.classList.remove("error-active");
                window.comunicacion.registroValido(username.value, birthday.value);
            } catch (e) {
                // alert(e);
            }
        }
    });
}