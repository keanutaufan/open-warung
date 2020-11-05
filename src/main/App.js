const { app, dialog, ipcMain } = require('electron');
const WindowManager = require('./WindowManager');


let mainWindow;
let modalRegisterItem, modalAddItem, modalSubtractItem;
let modalIncomeCashflow, modalSpendingCashflow;
let modalSetBalance;

app.on('ready', () => {
    mainWindow = WindowManager.init('MAIN_WINDOW');
    mainWindow.load('../renderer/main_window/main-window.html');

    // Comment/Hapus saat produksi
    // mainWindow.debug();
});

ipcMain.on('registerItem', () => {
    modalRegisterItem = WindowManager.init('REGISTER_ITEM', mainWindow);
    modalRegisterItem.load('../renderer/modal_register_item/register-item.html');
});

ipcMain.on('confirmRegisterItem', (_event, barang, stok, min, beli, jual) => {
    mainWindow.webContents.send('confirmRegisterItem', barang, stok, min, beli, jual);
    modalRegisterItem.close();
});


ipcMain.on('addItem', (_event, index) => {
    modalAddItem = WindowManager.init('ADD_ITEM_COUNT', mainWindow);
    modalAddItem.load('../renderer/modal_add_item/add-item.html');
    modalAddItem.webContents.once('did-finish-load', () => {
        modalAddItem.webContents.send('passIndex', index);
    });
});

ipcMain.on('confirmAddItem', (_event, index, ammount) => {
    mainWindow.webContents.send('confirmAddItem', index, ammount);
    modalAddItem.close();
});

ipcMain.on('subtractItem', (_event, index) => {
    modalSubtractItem = WindowManager.init('SUBTRACT_ITEM_COUNT', mainWindow);
    modalSubtractItem.load('../renderer/modal_subtract_item/subtract-item.html');
    modalSubtractItem.webContents.once('did-finish-load', () => {
        modalSubtractItem.webContents.send('passIndex', index);
    });
});

ipcMain.on('confirmSubtractItem', (_event, index, ammount) => {
    mainWindow.webContents.send('confirmSubtractItem', index, ammount);
    modalSubtractItem.close();
});

ipcMain.on('removeItem', (_event, index, itemName) => {
    dialog.showMessageBox(mainWindow, {
        type: 'warning',
        title: 'Konfirmasi Hapus Barang',
        message: 'Yakin akan menghapus barang ini?',
        detail: `Anda akan menghapus ${itemName} dari daftar barang dagangan`,
        buttons: ['Batal', 'Hapus']
    }).then(result => {
        if (result.response === 1) {
            mainWindow.webContents.send('confirmRemoveItem', index);
        }
    });
});

ipcMain.on('incomeCashflow', () => {
    modalIncomeCashflow = WindowManager.init('INCOME_CASHFLOW', mainWindow);
    modalIncomeCashflow.load('../renderer/modal_income_cashflow/income-cashflow.html');
});

ipcMain.on('confirmIncomeCashflow', (_event, item) => {
    mainWindow.webContents.send('confirmIncomeCashflow', item);
    modalIncomeCashflow.close();
});

ipcMain.on('spendingCashflow', () => {
    modalSpendingCashflow = WindowManager.init('SPENDING_CASHFLOW', mainWindow);
    modalSpendingCashflow.load('../renderer/modal_spending_cashflow/spending-cashflow.html');
});

ipcMain.on('confirmSpendingCashflow', (_event, item) => {
    mainWindow.webContents.send('confirmSpendingCashflow', item);
    modalSpendingCashflow.close();
});

ipcMain.on('removeCashflow', (_event, mode, index) => {
    dialog.showMessageBox(mainWindow, {
        type: 'warning',
        title: 'Konfirmasi Hapus Catatan',
        message: `Yakin akan menghapus catatan ${mode} ini?`,
        detail: `Anda akan menghapus catatan ${mode} dari sistem. Ketika sudah dihapus, catatan tidak dapat dikembalikan.`,
        buttons: ['Batal', 'Hapus']
    }).then(result => {
        if (result.response === 1) {
            mainWindow.webContents.send('confirmRemoveCashflow', index);
        }
    });
});

ipcMain.on('setBalance', () => {
    modalSetBalance = WindowManager.init('SET_BALANCE', mainWindow);
    modalSetBalance.load('../renderer/modal_set_balance/set-balance.html');
});