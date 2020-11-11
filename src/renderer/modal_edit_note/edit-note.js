const { ipcRenderer } = require('electron');

let index;

window.addEventListener('load', () => {
    document.getElementById('input-title').focus();
});

ipcRenderer.on('passData', (_event, passedIndex, passedTitle, passedText) => {
    index = passedIndex;
    document.getElementById('input-title').value = passedTitle;
    document.getElementById('input-text').value = passedText;
});

const confirmEditNote = () => {
    if(!validateInput()) {
        return;
    }

    const title = document.getElementById('input-title').value;
    const text = document.getElementById('input-text').value;    
    ipcRenderer.send('confirmEditNote', index, title, text);
}

const validateInput = () => {
    if (document.getElementById('input-title').value == '' || document.getElementById('input-text').value == '') {
        document.getElementById('error').innerText = 'Harap isi semua kolom!';
        return false;
    }
    document.getElementById('error').innerText = '';
    return true;
}