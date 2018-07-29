const electron = require("electron");
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow{
    constructor(url){
        super({
            width: 300,
            heigth: 500,
            frame: false, // hide native status bar
            resizable: false, // avoid resize window application
            show: false // hide window when app start
        });
        this.loadURL(url);
        this.on('blur', this.onBlur.bind(this));
    }

    onBlur(){
        // hide the window when user focus away clicking outside the app
        this.hide();
    }
    
}

module.exports = MainWindow;