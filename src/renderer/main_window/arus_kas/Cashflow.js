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

const remove = index => {
    Storage.removeCashFlow(index);
}

const generateHTML = (data, index) => {
    const operator = data.mode == 'pemasukan' ? '+' : '-';
    const monthName = [
        'ERROR', 'Januari', 'Februari', 'Maret',
        'April', 'Mei', 'Juni', 'Juli', 'Agustus',
        'September', 'Oktober', 'November', 'Desember'
    ];
    let dataDOMString = '';
    data.item.forEach(element => {
        dataDOMString += `
            <tr class="kas-item">
                <td class="kas-item-name">${element.name}</td>
                <td class="kas-item-value">${new Intl.NumberFormat('id').format(element.price)}</td>
            </tr>
        `;
    });

    return `
        <div class="card">
            <div class="card-${data.mode}-header">
                <div class="card-title" style="text-transform: capitalize">${data.mode}</div>
                <div class="card-total">${operator}Rp${new Intl.NumberFormat('id').format(data.total)}</div>
            </div>
            <div class="card-body">
                <table class="card-table">
                    <tr class="kas-item-header">
                        <th>Judul</th>
                        <th>Nilai ${data.mode}</th>
                    </tr>
                    ${dataDOMString}
                </table>
            </div>
            <div class="card-footer">
                <div class="card-time">
                    ${data.time.date} ${monthName[data.time.month]} ${data.time.year} 
                    ${data.time.hour}:${data.time.minute}
                </div>
                <button class="card-delete-${data.mode}" onclick="removeCashflow('${data.mode}', ${index})">Hapus</button>
            </div>
        </div>
    `;
}

const render = (month, year) => {
    let DOMString = '';

    if(month == 0 || year == 0) {
        for (let i = Storage.appData.cashFlow.length - 1; i >= 0; i--) {
            DOMString += generateHTML(Storage.appData.cashFlow[i], i);
        }
        document.getElementById('kas-data-list').innerHTML = DOMString;
    }
    else {
        for (let i = Storage.appData.cashFlow.length - 1; i >= 0; i--) {
            if (Storage.appData.cashFlow[i].time.year == year && Storage.appData.cashFlow[i].time.month == month) {
                DOMString += generateHTML(Storage.appData.cashFlow[i], i);
            }
        }
        document.getElementById('kas-data-list').innerHTML = DOMString;
    }
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

const loadBalance = () => {
    document.getElementById('kas-balance-value').innerText = `Rp${new Intl.NumberFormat('id').format(Storage.appData.account.balance)}`;
}

module.exports = {
    render: render,
    store: store,
    remove: remove,
    loadYearDropdown: loadYearDropdown,
    loadBalance: loadBalance
}
