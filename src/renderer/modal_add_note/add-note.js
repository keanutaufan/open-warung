const { ipcRenderer } = require('electron');

window.addEventListener('load', () => {
    document.getElementById('input-title').focus();
});

const confirmAddNote = () => {
    if(!validateInput()) {
        return;
    }

    const title = document.getElementById('input-title').value;
    const text = document.getElementById('input-text').value;    
    ipcRenderer.send('confirmAddNote', title, text);
}

const validateInput = () => {
    if (document.getElementById('input-title').value == '' || document.getElementById('input-text').value == '') {
        document.getElementById('error').innerText = 'Harap isi semua kolom!';
        return false;
    }
    document.getElementById('error').innerText = '';
    return true;
}