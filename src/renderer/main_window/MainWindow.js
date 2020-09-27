const { ipcRenderer } = require('electron');
const Component = require('./Component');

Component.register('components/beranda.html', 'beranda');
Component.register('components/barang.html', 'barang');
Component.register('components/arus-kas.html', 'arus-kas');
Component.register('components/pengaturan.html', 'pengaturan');
Component.register('components/bantuan.html', 'bantuan');
