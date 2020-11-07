const Storage = require('../Storage');

const loadProfile = () => {
    document.getElementById('profile-name').innerText = Storage.appData.account.name;
    document.getElementById('profile-location').innerText = Storage.appData.account.location;
}

const loadBalance = () => {
    document.getElementById('balance-value').innerText = `Rp${new Intl.NumberFormat('id').format(Storage.appData.account.balance)}`;
}

const load = () => {
    loadProfile();
    loadBalance();
}

module.exports = {
    loadProfile: loadProfile,
    loadBalance: loadBalance,
    load: load
}