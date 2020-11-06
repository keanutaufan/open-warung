const { ipcRenderer } = require('electron');

let index, barang, stok, min, beli, jual;

window.addEventListener('load', () => {
    document.getElementById('input-barang').focus();
});

ipcRenderer.on('passData', (_event, rIndex, rBarang, rStok, rMin, rBeli, rJual) => {
    index = rIndex;
    document.getElementById('input-barang').value = rBarang;
    document.getElementById('input-stok').value = rStok;
    document.getElementById('input-beli').value = rMin;
    document.getElementById('input-min').value = rBeli;
    document.getElementById('input-jual').value = rJual;
})

const confirmEditItem = () => {
    if(!validateInput()) {
        return;
    }
    ipcRenderer.send('confirmEditItem', index, barang, stok, min, beli, jual);
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