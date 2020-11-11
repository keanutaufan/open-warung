const { ipcRenderer } = require('electron');
const Component = require('./Component');
const Storage = require('./Storage');
const ItemTable = require('./ItemTable');
const Cashflow = require('./arus_kas/Cashflow');
const HomeLoader = require('./beranda/HomeLoader');
const Notes = require('./catatan/Notes');
const { store } = require('./arus_kas/Cashflow');


Component.register('components/beranda.html', 'beranda');
Component.register('components/barang.html', 'barang');
Component.register('components/arus-kas.html', 'arus-kas');
Component.register('components/catatan.html', 'catatan');
Component.register('components/backup.html', 'backup');



const loadTopbar = () => {
    const date = new Date();
    const monthName = [
        'Januari', 'Februari', 'Maret',
        'April', 'Mei', 'Juni', 'Juli', 'Agustus',
        'September', 'Oktober', 'November', 'Desember'
    ];
    const warungName = Storage.appData.account.name || "";
    const separator = warungName == '' ? ' ' : ' - ';
    const currentDate = `${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()}`;
    document.getElementById('topbar').innerText = `${warungName}${separator}${currentDate}`;
}

window.addEventListener('load', loadTopbar);

const menuNavigate = index => {
    document.getElementsByClassName('menu-item selected')[0].classList.remove('selected');
    document.getElementsByClassName('menu-item')[index].classList.add('selected');

    document.getElementsByClassName('content-component visible')[0].classList.remove('visible');
    document.getElementsByClassName('content-component')[index].classList.add('visible');
}


const searchTable = () => {
    let input, query, table, tr, td, txtValue;
    input = document.getElementById('search-input');
    query = input.value.toLowerCase();
    table = document.getElementById("barang-table");
    tr = Array.from(table.getElementsByTagName("tr"));  
    
    tr.forEach(data => {
        td = data.getElementsByTagName('td')[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
   
            if (txtValue.toLowerCase().indexOf(query) > -1) {
                data.style.display = "";
            }
            else {
                data.style.display = "none";
            }
        }
    });
}

const applyCashflowFilter = () => {
    const month = +document.getElementById('kas-bulan').value;
    const year = +document.getElementById('kas-tahun').value;
    Cashflow.render(month, year);
}


const registerItem = () => {
    ipcRenderer.send('registerItem', 1);
}

ipcRenderer.on('confirmRegisterItem', (_event, barang, stok, min, beli, jual) => {
    Storage.registerItem({
        barang: barang,
        stok: stok,
        min: min,
        beli: beli,
        jual: jual
    });
    HomeLoader.loadBarang();
    ItemTable.load();
});

const addItem = index => {
    ipcRenderer.send('addItem', index);
}

ipcRenderer.on('confirmAddItem', (_event, index, ammount) => {
    Storage.addItem(index, ammount);
    ItemTable.load();
});

const subtractItem = index => {
    ipcRenderer.send('subtractItem', index);
}

ipcRenderer.on('confirmSubtractItem', (_event, index, ammount) => {
    Storage.subtractItem(index, ammount);
    ItemTable.load();
});

const removeItem = index => {
    let itemName = Storage.appData.items[index].barang;
    ipcRenderer.send('removeItem', index, itemName);
}

ipcRenderer.on('confirmRemoveItem', (_event, index) => {
    Storage.removeItem(index);
    HomeLoader.loadBarang();
    ItemTable.load();
});

const editItem = index => {
    data = Storage.appData.items[index];
    ipcRenderer.send('editItem', index, data.barang, data.stok, data.min, data.beli, data.jual);
}

ipcRenderer.on('confirmEditItem', (_event, index, barang, stok, min, beli, jual) => {
    data = {
        barang: barang,
        stok: stok,
        min: min,
        beli: beli,
        jual: jual
    }
    Storage.editItem(index, data);
    ItemTable.load();
});

const incomeCashflow = () => {
    ipcRenderer.send('incomeCashflow', 0);
}

ipcRenderer.on('confirmIncomeCashflow', (_event, data) => {
    item = JSON.parse(data);
    Cashflow.store('pemasukan', ...item);
    Cashflow.render(0, 0);

    total = 0;
    item.forEach(element => {
        total += +element.price;
    });
    Storage.addBalance(total);
    HomeLoader.loadBalance();
    HomeLoader.loadCashflow();
    Cashflow.loadBalance();
});

const spendingCashflow = () => {
    ipcRenderer.send('spendingCashflow', 0);
}

ipcRenderer.on('confirmSpendingCashflow', (_event, data) => {
    item = JSON.parse(data);
    Cashflow.store('pengeluaran', ...item);
    Cashflow.render(0, 0);

    total = 0;
    item.forEach(element => {
        total += +element.price;
    });
    Storage.subtractBalance(total);
    HomeLoader.loadBalance();
    HomeLoader.loadCashflow();
    Cashflow.loadBalance();
});

const removeCashflow = (mode, index) => {
    ipcRenderer.send('removeCashflow', mode, index);
}

ipcRenderer.on('confirmRemoveCashflow', (_event, index) => {
    Cashflow.remove(index);
    HomeLoader.loadCashflow();
    applyCashflowFilter();
});

const editCashflow = (mode, index) => {
    data = JSON.stringify(Storage.appData.cashFlow[index].item);
    ipcRenderer.send('editCashflow', mode, index, data);
}

ipcRenderer.on('confirmEditCashflow', (_event, mode, index, initialTotal, data) => {
    item = JSON.parse(data);
    
    finalTotal = 0;
    item.forEach(element => {
        finalTotal += +element.price;
    });
    Storage.editCashflow(index, finalTotal, item);

    if (mode == 'pemasukan') {
        Storage.subtractBalance(initialTotal);
        Storage.addBalance(finalTotal);
    }
    else {
        Storage.addBalance(initialTotal);
        Storage.subtractBalance(finalTotal);
    }

    Cashflow.loadBalance();
    HomeLoader.loadBalance();
    HomeLoader.loadCashflow();
    applyCashflowFilter();
});

const setBalance = () => {
    ipcRenderer.send('setBalance', Storage.appData.account.balance);
}

ipcRenderer.on('confirmSetBalance', (_event, value) => {
    Storage.setBalance(value);
    Cashflow.loadBalance();
    HomeLoader.loadBalance();
});

const editProfile = () => {
    ipcRenderer.send('editProfile', Storage.appData.account.name, Storage.appData.account.location);
}

ipcRenderer.on('confirmEditProfile', (_event, name, location) => {
    Storage.editProfile(name, location);
    HomeLoader.loadProfile();
    loadTopbar();
});

const addNote = () => {
    ipcRenderer.send('addNote', 0);
}

ipcRenderer.on('confirmAddNote', (_event, title, text) => {
    Notes.add(title, text);
    Notes.render();
});

const removeNote = index => {
    ipcRenderer.send('removeNote', index);
}

ipcRenderer.on('confirmRemoveNote', (_event, index) => {
    Notes.remove(index);
    Notes.render();
});

const editNote = index => {
    const currentTitle = Storage.appData.notes[index].title;
    const currentText = Storage.appData.notes[index].text;
    ipcRenderer.send('editNote', index, currentTitle, currentText);
}

ipcRenderer.on('confirmEditNote', (_event, index, title, text) => {
    Storage.editNote(index, title, text);
    Notes.render();
});

const backupData = () => {
    const data = {
        metadata: Storage.appData.metadata,
        account: Storage.appData.account,
        items: Storage.appData.items,
        cashFlow: Storage.appData.cashFlow,
        notes: Storage.appData.notes,
        userPreferences: Storage.appData.userPreferences
    }

    const currentTime = new Date();
    const dayName = [
        'Minggu', 'Senin', 'Selasa',
        'Rabu', 'Kamis', 'Jumat', 'Sabtu'
    ];

    data.metadata.lastBackup = {
        year: currentTime.getFullYear(),
        month: currentTime.getMonth() + 1,
        date: currentTime.getDate(),
        day: dayName[currentTime.getDay()],
        hour: currentTime.getHours(),
        minute: currentTime.getMinutes()
    }

    ipcRenderer.send('backupData', JSON.stringify(data));
}

const restoreData = () => {
    ipcRenderer.send('restoreData', 0);
}

ipcRenderer.on('confirmRestoreData', (_event, dataString) => {
    let data;
    try {
        data = JSON.parse(dataString);
    }
    catch(error) {
        alert('Gagal membaca data pada file. Pastikan file yang dipilih adalah file backup Open Warung yang tidak dimodifikasi!');
        return;
    }

    const keyValidator = ['metadata', 'account', 'items', 'cashFlow', 'notes', 'userPreferences'];
    if (keyValidator.every(key => Object.keys(data).includes(key))) {
        ipcRenderer.send('showRestoreInfo', JSON.stringify(data));
    }
    else {
        alert('Gagal membaca data pada file. Pastikan file yang dipilih adalah file backup Open Warung yang tidak dimodifikasi!');
    }
});

ipcRenderer.on('proceedRestore', (_event, stringData) => {
    const data = JSON.parse(stringData);
    Storage.loadBackup(data);
    ipcRenderer.send('requestReload', 0);
})