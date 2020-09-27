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