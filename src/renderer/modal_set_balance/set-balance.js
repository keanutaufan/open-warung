const { ipcRenderer } = require('electron');

window.addEventListener('load', () => {
    document.getElementById('input-set-balance').focus();
});

ipcRenderer.on('passBalance', (_event, balance) => {
    document.getElementById('input-set-balance').value = balance;
});

const confirmSetBalance = () => {
    if(!validateInput()) {
        return;
    }

    let value = +document.getElementById('input-set-balance').value;
    ipcRenderer.send('confirmSetBalance', value);
}

const validateInput = () => {
    let inputValue = document.getElementById('input-set-balance').value;
    let errorText = document.getElementById('error');
    if(+inputValue < 0) {
        errorText.innerText = "Saldo tidak boleh negatif!";
        return false;
    }
    document.getElementById('error').innerText = "";
    return true;
}