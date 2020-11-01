const Storage = require('../Storage');

const store = (mode, total, ...item) => {
    const currentTime = new Date();
    const dayName = [
        'Minggu', 'Senin', 'Selasa',
        'Rabu', 'Kamis', 'Jumat', 'Sabtu'
    ];

    Storage.recordCashFlow({
        mode: mode,
        time: {
            year: currentTime.getFullYear(),
            month: currentTime.getMonth() + 1,
            date: currentTime.getDate(),
            day: dayName[currentTime.getDay()],
            hour: currentTime.getHours(),
            minute: currentTime.getMinutes()
        },
        item: item,
        total: total
    });
}
