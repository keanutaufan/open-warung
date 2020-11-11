const Storage = require('../Storage');

const add = (title, text) => {
    const currentTime = new Date();
    const dayName = [
        'Minggu', 'Senin', 'Selasa',
        'Rabu', 'Kamis', 'Jumat', 'Sabtu'
    ];

    Storage.addNote({
        title: title,
        text: text,
        time: {
            year: currentTime.getFullYear(),
            month: currentTime.getMonth() + 1,
            date: currentTime.getDate(),
            day: dayName[currentTime.getDay()],
            hour: currentTime.getHours(),
            minute: currentTime.getMinutes()
        }
    });
} 

const remove = index => {
    Storage.removeNote(index);
}

const generateHTML = (data, index) => {
    const monthName = [
        'ERROR', 'Januari', 'Februari', 'Maret',
        'April', 'Mei', 'Juni', 'Juli', 'Agustus',
        'September', 'Oktober', 'November', 'Desember'
    ];

    return `
        <div class="card notes-card">
            <div class="card-pemasukan-header">
                <div class="card-title" style="text-transform: capitalize">${data.title}</div>
            </div>
            <div class="card-body notes-body">
                ${data.text}
            </div>
            <div class="card-footer notes-footer">
                <div class="card-time">
                    ${data.time.date} ${monthName[data.time.month]} ${data.time.year} 
                    ${data.time.hour}:${data.time.minute}
                </div>
                <div class="card-button-container">
                    <button class="card-delete-pemasukan" onclick="editNote(${index})">Edit</button>
                    <button class="card-delete-pengeluaran" onclick="removeNote(${index})">Hapus</button>
                </div>
            </div>
        </div>
    `;
}

const render = () => {
    let DOMString = '';

    for (let i = Storage.appData.notes.length - 1; i >= 0; i--) {
        DOMString += generateHTML(Storage.appData.notes[i], i);
    }
    document.getElementById('catatan-data-list').innerHTML = DOMString;
}

module.exports = {
    add: add,
    remove: remove,
    generateHTML: generateHTML,
    render: render
}