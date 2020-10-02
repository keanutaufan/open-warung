const { ipcRenderer } = require('electron');

let index;

window.addEventListener('load', () => {
    document.getElementById('input-add-item').focus();
});

ipcRenderer.on('passIndex', (_event, data) => {
    index = +data;
});

const confirmAddItem = () => {
    if(!validateInput()) {
        console.log('Invalid input');
        return;
    }

    let ammount = +document.getElementById('input-add-item').value;
    ipcRenderer.send('confirmAddItem', index, ammount);
}

const validateInput = () => {
    let inputValue = document.getElementById('input-add-item').value;
    let errorText = document.getElementById('error');
    if(+inputValue <= 0) {
        errorText.innerText = "Masukkan angka yang positif!";
        return false;
    }
    document.getElementById('error').innerText = "";
    return true;
}