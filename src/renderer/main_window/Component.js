const ItemTable = require('./ItemTable');
const Cashflow = require('./arus_kas/Cashflow');
const HomeLoader = require('./beranda/HomeLoader');
const Notes = require('./catatan/Notes');

module.exports = {
    register(path, tagname) {
        fetch(path)
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.querySelector(tagname).innerHTML = data;
        })
        .then(() => {
            if (tagname == 'beranda') {
                HomeLoader.load();
                ItemTable.loadAlert();
            }
            else if (tagname == 'barang') {
                ItemTable.load();
            }
            else if (tagname == 'arus-kas') {
                Cashflow.loadBalance();
                Cashflow.loadYearDropdown();
                Cashflow.render(0, 0);
            }
            else if (tagname == 'catatan') {
                Notes.render();
            }
        });
    }
}