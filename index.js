//import path helper from node.js
const path = require('path');
const electron = require('electron');
const { app, BrowserWindow } = electron;
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

let mainWindow; let tray;

app.on('ready', () =>{
    app.dock.hide();
    //load the src index.html containing react webpack code
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    // __dirname = current working directory
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    // visualize native tray icon
    tray = new TimerTray(iconPath, mainWindow);
});