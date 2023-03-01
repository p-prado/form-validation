const {app, BrowserWindow, ipcMain} = require("electron");

// Define a list of already taken usernames
const unavailableUsers = ["juanperez", "carlosjuarez", "admin"];

// Manage the start screen
let ventana;
function createWindow() {
    ventana = new BrowserWindow({
        width: 600,
        height: 500,
        webPreferences: {
            preload:`${app.getAppPath()}/preload.js`,
        }
    });
    ventana.loadFile("index.html");
}

// Create secondary window (welcome screen)
let ventana2;
function createWindow2() {
    ventana2 = new BrowserWindow({
        // parent: ventana,
        // modal: true,
        width: 600,
        height: 500,
        webPreferences: {
            preload: `${app.getAppPath()}/preload.js`
        }
    });
    ventana2.loadFile('second.html');
}

// When there's a valid registration, create the welcome window, and call the function to edit the contents of the new window.
ipcMain.on('registroValido', function(event, username, birthday){
    createWindow2();
    ventana2.webContents.on('did-finish-load', function(){
        ventana2.webContents.send('inicioCorrecto', username, birthday);
        // Close the parent window.
        ventana.close();
    });
});

ipcMain.on('verifyUser', function(event, username){
    if (!unavailableUsers.includes(username)) {
        ventana.webContents.send('validatedUserError', false);
    } else {
        ventana.webContents.send('validatedUserError', true);
    }
});

ipcMain.on('backToStartScreen', function(){
    createWindow();
    ventana2.close();
})

app.whenReady().then(createWindow);