const { ipcRenderer } = require('electron');
const Component = require('./Component');


Component.register('components/beranda.html', 'beranda');
Component.register('components/barang.html', 'barang');
Component.register('components/arus-kas.html', 'arus-kas');
Component.register('components/pengaturan.html', 'pengaturan');
Component.register('components/bantuan.html', 'bantuan');


const menuNavigate = index => {
    document.getElementsByClassName('menu-item selected')[0].classList.remove('selected');
    document.getElementsByClassName('menu-item')[index].classList.add('selected');

    document.getElementsByClassName('content-component visible')[0].classList.remove('visible');
    document.getElementsByClassName('content-component')[index].classList.add('visible');
}


const searchTable = () => {
    let input, query, table, tr, td, txtValue;
    input = document.getElementById('search-input');
    query = input.value.toLowerCase();
    table = document.getElementById("barang-table");
    tr = Array.from(table.getElementsByTagName("tr"));  
    
    tr.forEach(data => {
        td = data.getElementsByTagName('td')[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
   
            if (txtValue.toLowerCase().indexOf(query) > -1) {
                data.style.display = "";
            }
            else {
                data.style.display = "none";
            }
        }
    });
}


const addItem = index => {
    ipcRenderer.send('addItem', index);
}

const subtractItem = index => {
    ipcRenderer.send('subtractItem', index);
}