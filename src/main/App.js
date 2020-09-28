const { app, ipcMain } = require('electron');
const WindowManager = require('./WindowManager');


let mainWindow, modalAddItem, modalSubtractItem;

app.on('ready', () => {
    mainWindow = WindowManager.init('MAIN_WINDOW');
    mainWindow.load('../renderer/main_window/main-window.html');
});


ipcMain.on('addItem', (_event, index) => {
    modalAddItem = WindowManager.init('ADD_ITEM_COUNT', mainWindow);
    modalAddItem.load('../renderer/modal_add_item/add-item.html');
});

ipcMain.on('subtractItem', (_event, index) => {
    modalSubtractItem = WindowManager.init('SUBTRACT_ITEM_COUNT', mainWindow);
    modalSubtractItem.load('../renderer/modal_subtract_item/subtract-item.html');
});