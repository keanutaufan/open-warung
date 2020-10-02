const { ipcRenderer } = require('electron');
const Storage = require('../main_window/Storage');

let index, jumlahData;

window.addEventListener('load', () => {
    document.getElementById('input-subtract-item').focus();
});

ipcRenderer.on('passIndex', (_event, data) => {
    index = +data;
    jumlahData = Storage.appData.items[index].stok;
});

const confirmSubtractItem = () => {
    if(!validateInput()) {
        return;
    }

    let ammount = +document.getElementById('input-subtract-item').value;
    ipcRenderer.send('confirmSubtractItem', index, ammount);
}

const validateInput = () => {
    let inputVal = document.getElementById('input-subtract-item').value;
    let errorText = document.getElementById('error');
    if(+inputVal <= 0) {
        errorText.innerText = 'Masukkan angka yang positif!';
        return false;
    }
    else if(+inputVal > jumlahData) {
        errorText.innerText = 'Barang tidak sebanyak itu!';
        return false;
    }
    document.getElementById('error').innerText = "";
    return true;
}