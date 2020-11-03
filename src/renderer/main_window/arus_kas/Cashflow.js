const Storage = require('../Storage');

const store = (mode, ...item) => {
    const currentTime = new Date();
    const dayName = [
        'Minggu', 'Senin', 'Selasa',
        'Rabu', 'Kamis', 'Jumat', 'Sabtu'
    ];
    let total = 0;
    item.forEach(element => {
        total += +element.price;
    });

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

const loadYearDropdown = () => {
    const dropdown = document.getElementById('kas-tahun');
    let date = new Date();

    for (let i = date.getFullYear(); i >= 2020; i--) {
        let node = document.createElement('option');
        node.value = i;
        node.innerText = i.toString();
        dropdown.appendChild(node);
    }
}

module.exports = {
    store: store,
    loadYearDropdown: loadYearDropdown
}
