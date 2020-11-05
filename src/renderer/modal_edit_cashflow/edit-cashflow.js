const { ipcRenderer } = require("electron");

let currentIndex = 0; 
let data;
let mode;
let targetIndex;
let initialTotal;

ipcRenderer.on('passData', (_event, receivedMode, receivedIndex, receivedData) => {
    mode = receivedMode;
    data = JSON.parse(receivedData);
    targetIndex = receivedIndex;

    let capitalizedMode = mode.charAt(0).toUpperCase() + mode.slice(1);
    document.getElementsByTagName('title')[0].innerText = `Edit Catatan ${capitalizedMode}`;
    document.getElementById('header-text').innerText = `Edit Catatan ${capitalizedMode}`;

    initialTotal = 0;
    data.forEach(element => {
        initialTotal += element.price;
    });

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

const confirmEditCashflow = () => {
    if (!validateInput()) {
        return;
    }

    let item = [];

    Array.from(document.getElementsByClassName('input-container')).forEach((element, index) => {
        if (element.style.display != 'none') {
            item.push({
                name: document.getElementsByClassName('input-judul')[index].value,
                price: +document.getElementsByClassName('input-nilai')[index].value
            });
        }
    }); 

    ipcRenderer.send('confirmEditCashflow', mode, targetIndex, initialTotal, JSON.stringify(item));
}

const validateInput = () => {
    let isValid = true;

    Array.from(document.getElementsByClassName('input-container')).forEach((element, index) => {
        if (element.style.display != 'none') {
            let checkTitle = document.getElementsByClassName('input-judul')[index].value == '';
            let checkValue = document.getElementsByClassName('input-nilai')[index].value == '';
            let checkNegative = document.getElementsByClassName('input-nilai')[index].value >= 0;

            if (checkTitle || checkValue || !checkNegative) {
                isValid = false;
            }
        }
    });

    return isValid;
}
