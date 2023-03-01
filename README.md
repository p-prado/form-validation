# Semana 2 - Programación Avanzada
Este programa es un formulario de registro con validación.

## Functionality
### Form Validation
This form has JavaScript validation for the following:
* Password - it must contain at least 8 characters, including 1 lower-case letter, 1 upper-case letter, and 1 number.
* Email - using the default verification, it must include and `@` sign and a ` . `
* Date of Birth - it must be in the past, not in the future.
If these three verifications pass, the last verification is run prior to loading the Welcome page.
* Username - it must not be in the `unavailableUsernames` array specified in the `main.js` file.
