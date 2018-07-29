//import path helper from node.js
const path = require('path');
const electron = require('electron');
const { app, BrowserWindow } = electron;
const TimerTray = require('./app/timer_tray');

let mainWindow; let tray;

app.on('ready', () =>{
    app.dock.hide();
    mainWindow = new BrowserWindow({
        width: 300,
        heigth: 500,
        frame: false, // hide native status bar
        resizable: false, // avoid resize window application
        show: false // hide window when app start
    });
    // hide the window when user focus away clicking outside the app
    mainWindow.prependListener('blur', ()=>{
        mainWindow.hide();
    });
    //load the src index.html containing react webpack code
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    // __dirname = current working directory
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    // visualize native tray icon
    tray = new TimerTray(iconPath, mainWindow);
});