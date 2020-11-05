const path = require('path');
const { BrowserWindow, Menu } = require('electron');

module.exports = {
    init(type, parent = undefined) {
        let win;

        switch (type) {
            case 'MAIN_WINDOW':
                win = new BrowserWindow({
                    width: 1920, height: 1080,
                    maxWidth: 1920, maxHeight: 1080,
                    minWidth: 1280, minHeight: 720,
                    title: 'Open Warung',
                    show: false,
                    webPreferences: {
						nodeIntegration: true
                    }
				});
				
				win.windowType = 'main';
                break;

			case 'REGISTER_ITEM':
				win = new BrowserWindow({
					width: 500, height: 400,
					modal: true, parent: parent,
					backgroundColor: '#121212', show: false,
					minimizable: false, resizable: false,
					title: 'Daftarkan Barang',
					webPreferences: {
						nodeIntegration: true
					}
				});

				win.windowType = 'modal';
				win.parent = parent;
				break;
			
			case 'ADD_ITEM_COUNT':
				win = new BrowserWindow({
					width: 500, height: 300,
					modal: true, parent: parent,
					backgroundColor: '#121212', show: false,
					minimizable: false, resizable: false,
					title: 'Tambah Barang',
					webPreferences: {
						nodeIntegration: true
					}
				});

				win.windowType = 'modal';
				win.parent = parent;
				break;

			case 'SUBTRACT_ITEM_COUNT':
				win = new BrowserWindow({
					width: 500, height: 300,
					modal: true, parent: parent,
					backgroundColor: '#121212', show: false,
					minimizable: false, resizable: false,
					title: 'Kurangi Barang',
					webPreferences: {
						nodeIntegration: true
					}
				});

				win.windowType = 'modal';
				win.parent = parent;
				break;

			case 'INCOME_CASHFLOW':
				win = new BrowserWindow({
					width: 700, height: 450,
					modal: true, parent: parent,
					backgroundColor: '#121212', show: false,
					minimizable: false, resizable: false,
					title: 'Catat Pemasukan',
					webPreferences: {
						nodeIntegration: true
					}
				});

				win.windowType = 'modal';
				win.parent = parent;
				break;

			case 'SPENDING_CASHFLOW':
				win = new BrowserWindow({
					width: 700, height: 450,
					modal: true, parent: parent,
					backgroundColor: '#121212', show: false,
					minimizable: false, resizable: false,
					title: 'Catat Pengeluaran',
					webPreferences: {
						nodeIntegration: true
					}
				});

				win.windowType = 'modal';
				win.parent = parent;
				break;

			case 'EDIT_CASHFLOW':
				win = new BrowserWindow({
					width: 700, height: 450,
					modal: true, parent: parent,
					backgroundColor: '#121212', show: false,
					minimizable: false, resizable: false,
					title: 'Edit Catatan',
					webPreferences: {
						nodeIntegration: true
					}
				});

				win.windowType = 'modal';
				win.parent = parent;
				break;

			case 'SET_BALANCE':
				win = new BrowserWindow({
					width: 500, height: 300,
					modal: true, parent: parent,
					backgroundColor: '#121212', show: false,
					minimizable: false, resizable: false,
					title: 'Ubah Saldo',
					webPreferences: {
						nodeIntegration: true
					}
				});

				win.windowType = 'modal';
				win.parent = parent;
				break;
			

			default:
				throw new Error(`${type} does not exist in ModalWindow`);
                break;
        }

        win.load = this.load;
        win.debug = this.debug;

        return win;
    },


    load(file) {
        this.loadURL(path.resolve(__dirname, file));
        this.once('ready-to-show', () => {
			this.show();
			if (this.windowType == 'main') {
				this.maximize();
				Menu.setApplicationMenu(null);
				return;
			}
			else {
				this.once('close', () => {
					this.parent.setAlwaysOnTop(true);
				});
				this.once('closed', () => {
					this.parent.setAlwaysOnTop(false);
					return;
				});
			}
        });
    },

    debug() {
        this.webContents.openDevTools();
        return;
	}
}