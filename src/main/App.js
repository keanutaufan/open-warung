const { app, dialog, ipcMain } = require('electron');
const WindowManager = require('./WindowManager');


let mainWindow;
let modalEditProfile;
let modalRegisterItem, modalAddItem, modalSubtractItem, modalEditItem;
let modalIncomeCashflow, modalSpendingCashflow, modalEditCashflow;
let modalSetBalance;
let modalAddNote;

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

ipcMain.on('editItem', (_event, index, barang, stok, min, beli, jual) => {
    modalEditItem = WindowManager.init('EDIT_ITEM', mainWindow);
    modalEditItem.load('../renderer/modal_edit_item/edit-item.html');
    modalEditItem.webContents.once('did-finish-load', () => {
        modalEditItem.webContents.send('passData', index, barang, stok, beli, min, jual);
    });
});

ipcMain.on('confirmEditItem', (_event, index, barang, stok, min, beli, jual) => {
    mainWindow.webContents.send('confirmEditItem', index, barang, stok, min, beli, jual);
    modalEditItem.close();
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

ipcMain.on('editCashflow', (_event, mode, index, data) => {
    modalEditCashflow = WindowManager.init('EDIT_CASHFLOW', mainWindow);
    modalEditCashflow.load('../renderer/modal_edit_cashflow/edit-cashflow.html');
    modalEditCashflow.webContents.once('did-finish-load', () => {
        modalEditCashflow.webContents.send('passData', mode, index, data);
    });
});

ipcMain.on('confirmEditCashflow', (_event, mode, index, initialTotal, data) => {
    mainWindow.webContents.send('confirmEditCashflow', mode, index, initialTotal, data);
    modalEditCashflow.close();
});

ipcMain.on('setBalance', (_event, balance) => {
    modalSetBalance = WindowManager.init('SET_BALANCE', mainWindow);
    modalSetBalance.load('../renderer/modal_set_balance/set-balance.html');
    modalSetBalance.webContents.once('did-finish-load', () => {
        modalSetBalance.webContents.send('passBalance', balance);
    });
});

ipcMain.on('confirmSetBalance', (_event, value) => {
    mainWindow.webContents.send('confirmSetBalance', value);
    modalSetBalance.close();
});

ipcMain.on('editProfile', (_event, currentName, currentLocation) => {
    modalEditProfile = WindowManager.init('EDIT_PROFILE', mainWindow);
    modalEditProfile.load('../renderer/modal_edit_profile/edit-profile.html');
    modalEditProfile.webContents.once('did-finish-load', () => {
        modalEditProfile.webContents.send('passData', currentName, currentLocation);
    });
});

ipcMain.on('confirmEditProfile', (_event, name, location) => {
    mainWindow.webContents.send('confirmEditProfile', name, location);
    modalEditProfile.close();
});

ipcMain.on('addNote', () => {
    modalAddNote = WindowManager.init('ADD_NOTE', mainWindow);
    modalAddNote.load('../renderer/modal_add_note/add-note.html');
})