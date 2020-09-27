const ItemTable = require('./ItemTable');

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
            if (tagname == 'barang') {
                ItemTable.load();
            }
        });
    }
}