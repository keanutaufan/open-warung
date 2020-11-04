const { ipcRenderer } = require("electron");

let currentIndex = 0;

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

const confirmIncomeCashflow = () => {
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

    ipcRenderer.send('confirmIncomeCashflow', JSON.stringify(item));
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