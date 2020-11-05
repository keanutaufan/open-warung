const { ipcRenderer } = require("electron");

let currentIndex = 0;
let data;
let mode;

ipcRenderer.on('passData', (_event, receivedMode, receivedData) => {
    mode = receivedMode;
    data = JSON.parse(receivedData);

    document.getElementsByClassName('input-judul')[0].value = data[0].name;
    document.getElementsByClassName('input-nilai')[0].value = data[0].price;

    while(currentIndex < data.length - 1) {
        addInputList();
        document.getElementsByClassName('input-judul')[currentIndex].value = data[currentIndex].name;
        document.getElementsByClassName('input-nilai')[currentIndex].value = data[currentIndex].price;
    }
});

const removeInputList = index => {
    document.getElementsByClassName('input-container')[index].style.display = 'none';
}

const addInputList = () => {
    currentIndex++;

    let parentNode = document.createElement('div');
    parentNode.className = 'input-container';

    let titleNode = document.createElement('input');
    titleNode.className = 'input-judul';
    titleNode.type = 'text';
    titleNode.placeholder = 'Nama pemasukan';
    titleNode.maxLength = 60;

    let valueNode = document.createElement('input');
    valueNode.className = 'input-nilai';
    valueNode.type = 'number';
    valueNode.placeholder = 'Nilai pemasukan';
    valueNode.min = 1;

    let buttonNode = document.createElement('button');
    buttonNode.className = 'input-delete';
    buttonNode.setAttribute('onclick', `event.preventDefault(); removeInputList(${currentIndex})`);
    buttonNode.innerHTML = 'X';

    parentNode.appendChild(titleNode);
    parentNode.appendChild(valueNode);
    parentNode.appendChild(buttonNode);

    document.getElementById('input-list').insertBefore(parentNode, document.getElementById('input-add'));
}
