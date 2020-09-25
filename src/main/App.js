const { app } = require('electron');
const WindowManager = require('./WindowManager');

app.on('ready', () => {
    const mainWindow = WindowManager.init('MAIN_WINDOW');
    mainWindow.load('../renderer/main_window/main-window.html');
});