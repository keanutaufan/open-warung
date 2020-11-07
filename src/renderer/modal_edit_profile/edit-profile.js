const { ipcRenderer } = require('electron');

window.addEventListener('load', () => {
    document.getElementById('input-edit-name').focus();
});

ipcRenderer.on('passData', (_event, name, location) => {
    document.getElementById('input-edit-name').value = name;
    document.getElementById('input-edit-location').value = location;
});

const confirmEditProfile = () => {
    if(!validateInput()) {
        return;
    }

    let name = document.getElementById('input-edit-name').value;
    let location = document.getElementById('input-edit-location').value;
    ipcRenderer.send('confirmEditProfile', name, location);
}

const validateInput = () => {
    let inputName = document.getElementById('input-edit-name').value;
    let inputLocation = document.getElementById('input-edit-location').value;
    let errorText = document.getElementById('error');
    if (!inputName) {
        errorText.innerText = "Harap isi nama warung";
        return false;
    }
    if (+inputLocation == 0) {
        errorText.innerText = "Harap isi lokasi"
        return false;
    }
    document.getElementById('error').innerText = "";
    return true;
}