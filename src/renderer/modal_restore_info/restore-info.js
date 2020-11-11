const { ipcRenderer } = require('electron');

let data;

ipcRenderer.on('passData', (_event, stringData) => {
    data = JSON.parse(stringData);
    const monthName = [
        'Januari', 'Februari', 'Maret',
        'April', 'Mei', 'Juni', 'Juli', 'Agustus',
        'September', 'Oktober', 'November', 'Desember'
    ];

    document.getElementById('name').innerText = data.account.name;
    document.getElementById('location').innerText = data.account.location;

    document.getElementById('saldo-value').innerText = `Rp${new Intl.NumberFormat('id').format(data.account.balance)}`;
    document.getElementById('barang-value').innerText = data.items.length;
    document.getElementById('catatan-value').innerText = data.notes.length;
    document.getElementById('tanggal-value').innerText = (
        `${data.metadata.lastBackup.day}, ${data.metadata.lastBackup.date} ${monthName[data.metadata.lastBackup.month - 1]} ${data.metadata.lastBackup.year}`
    );
    document.getElementById('jam-value').innerText = (
        `${data.metadata.lastBackup.hour}:${data.metadata.lastBackup.minute}`
    );
});

const proceedRestore = () => {
    ipcRenderer.send('proceedRestore', JSON.stringify(data));
}

const cancelRestore = () => {
    ipcRenderer.send('cancelRestore', 0);
}