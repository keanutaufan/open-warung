const Storage = require('../Storage');

const loadProfile = () => {
    document.getElementById('profile-name').innerText = Storage.appData.account.name;
    document.getElementById('profile-location').innerText = Storage.appData.account.location;
}

const loadBalance = () => {
    document.getElementById('balance-value').innerText = `Rp${new Intl.NumberFormat('id').format(Storage.appData.account.balance)}`;
}

const loadBarang = () => {
    document.getElementById('barang-count').innerText = Storage.appData.items.length || 0;
}

const loadCashflow = () => {
    const d = new Date();
    let incomeCount = 0;
    let incomeValue = 0;
    let spendingCount = 0;
    let spendingValue = 0;

    for (let i = Storage.appData.cashFlow.length - 1; i >= 0; i--) {
        if (Storage.appData.cashFlow[i].time.month != d.getMonth() + 1) {
            break;
        }

        if (Storage.appData.cashFlow[i].mode == 'pemasukan') {
            incomeCount += Storage.appData.cashFlow[i].item.length;
            incomeValue += Storage.appData.cashFlow[i].total;
        }
        else {
            spendingCount += Storage.appData.cashFlow[i].item.length;
            spendingValue += Storage.appData.cashFlow[i].total;
        }
    }

    document.getElementById('income-count').innerText = incomeCount;
    document.getElementById('income-value').innerText = `Rp${new Intl.NumberFormat('id').format(incomeValue)}`;

    document.getElementById('spending-count').innerText = spendingCount;
    document.getElementById('spending-value').innerText = `Rp${new Intl.NumberFormat('id').format(spendingValue)}`;
}

const load = () => {
    loadProfile();
    loadBalance();
    loadBarang();
    loadCashflow();
}

module.exports = {
    loadProfile: loadProfile,
    loadBalance: loadBalance,
    loadBarang: loadBarang,
    loadCashflow: loadCashflow,
    load: load
}