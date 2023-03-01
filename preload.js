const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld(
    "comunicacion",
    {
        registroValido: (username, birthday) => ipcRenderer.send('registroValido', username, birthday)
        ,
        inicioCorrecto: (username, birthday) => ipcRenderer.on('inicioCorrecto', username, birthday)
        ,
        verifyUser: (username) => ipcRenderer.send('verifyUser', username)
        ,
        validatedUserError: (result) => ipcRenderer.on('validatedUserError', result)
    }
);