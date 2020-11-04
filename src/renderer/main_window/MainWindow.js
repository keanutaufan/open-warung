const { ipcRenderer } = require('electron');
const Component = require('./Component');
const Storage = require('./Storage');
const ItemTable = require('./ItemTable');
const Cashflow = require('./arus_kas/Cashflow');


Component.register('components/beranda.html', 'beranda');
Component.register('components/barang.html', 'barang');
Component.register('components/arus-kas.html', 'arus-kas');
Component.register('components/pengaturan.html', 'pengaturan');
Component.register('components/bantuan.html', 'bantuan');


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
    ItemTable.load();
});

const incomeCashflow = () => {
    ipcRenderer.send('incomeCashflow', 0);
}

ipcRenderer.on('confirmIncomeCashflow', (_event, data) => {
    item = JSON.parse(data);
    Cashflow.store('pemasukan', ...item);
    Cashflow.render(0, 0);
});

const spendingCashflow = () => {
    ipcRenderer.send('spendingCashflow', 0);
}

ipcRenderer.on('confirmSpendingCashflow', (_event, data) => {
    item = JSON.parse(data);
    Cashflow.store('pengeluaran', ...item);
    Cashflow.render(0, 0);
});