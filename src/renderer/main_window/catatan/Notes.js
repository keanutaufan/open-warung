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

module.exports = {
    add: add,
    remove: remove
}