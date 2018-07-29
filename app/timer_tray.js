const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray{
    constructor(iconPath, mainWindow){
        super(iconPath);
        this.mainWindow = mainWindow;
        this.setToolTip('Timer App');
        // set up the click event handler and bind context
        // bind make sure that this still a refernce inside the click function
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
    }

    onClick(event, bounds){
        // destructure bounds object
        const { x, y } = bounds;
        // destructure windows bounds object
        const { height, width } = this.mainWindow.getBounds();
        if(this.mainWindow.isVisible())
        this.mainWindow.hide();
        else{
            // to set height/width and x,y position
            // es6 no change y, height, width
            const yPoisition = process.platform === 'darwin' ? y : y -height;
            this.mainWindow.setBounds({
                x: (x - width / 2),
                y: yPoisition, 
                height,
                width
            });
            this.mainWindow.show();
        }
    }

    onRightClick(){
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ]);
        this.popUpContextMenu(menuConfig);
    }
}

module.exports = TimerTray;