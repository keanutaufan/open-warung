const { ipcRenderer } = require('electron');

let barang, stok, min, beli, jual;

window.addEventListener('load', () => {
    document.getElementById('input-barang').focus();
});

const confirmRegisterItem = () => {
    if(!validateInput()) {
        return;
    }
    ipcRenderer.send('confirmRegisterItem', barang, stok, min, beli, jual);
}

const validateInput = () => {
    barang = document.getElementById('input-barang').value;
    stok = +document.getElementById('input-stok').value;
    min = +document.getElementById('input-min').value;
    beli = +document.getElementById('input-beli').value;
    jual = +document.getElementById('input-jual').value;
    
    const errorText = document.getElementById('error');

    if(!(barang && stok && min && beli && jual)) {
        errorText.innerText = 'Isi semua kolom informasi barang!';
        return false;
    }
    
    document.getElementById('error').innerText = "";
    return true;
}