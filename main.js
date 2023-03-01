const {app, BrowserWindow, ipcMain} = require("electron");

const unavailableUsers = ["juanperez", "carlosjuarez", "admin"];

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

let ventana2;

function createWindow2() {
    ventana2 = new BrowserWindow({
        width: 600,
        height: 500,
        webPreferences: {
            preload: `${app.getAppPath()}/preload.js`
        }
    });
    ventana2.loadFile('second.html');
}

ipcMain.on('registroValido', function(event, username, birthday){
    createWindow2();
    ventana2.webContents.on('did-finish-load', function(){
        ventana2.webContents.send('inicioCorrecto', username, birthday);
    });
});

ipcMain.on('verifyUser', function(event, username){
    if (!unavailableUsers.includes(username)) {
        ventana.webContents.send('validatedUserError', false);
        // There is no error.
    } else {
        ventana.webContents.send('validatedUserError', true);
        // There is an error.
    }
})

app.whenReady().then(createWindow);