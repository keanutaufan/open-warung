const Storage = require('./Storage');

module.exports = {
    load() {
        let data = Storage.appData.items;
        let table = document.getElementById('barang-table');

        let DOMString = `
            <tr>
                <th>Nama Barang</th>
                <th>Stok</th>
                <th>Min</th>
                <th>Harga Beli</th>
                <th>Harga Jual</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        `;

        data.forEach((element, index) => {
            DOMString += `
                <tr>
                    <td class="data-visualizer">${element.barang}</td>
                    <td class="data-visualizer">${element.stok}</td>
                    <td class="data-visualizer">${element.min}</td>
                    <td class="data-visualizer">${new Intl.NumberFormat('id').format(element.beli)}</td>
                    <td class="data-visualizer">${new Intl.NumberFormat('id').format(element.jual)}</td>
                    <td class="table-button"><span onclick="addItem(${index})" class="btn-add"><img src="../../assets/icons/btn-add.svg" class="img-add"></span></td>
                    <td class="table-button"><span onclick="subtractItem(${index})" class="btn-subtract"><img src="../../assets/icons/btn-subtract.svg" class="img-subtract"></span></td>
                    <td class="table-button"><span onclick="deleteItem(${index})" class="btn-delete"><img src="../../assets/icons/btn-delete.svg" class="img-delete"></span></td>
                </tr>
            `;
        });

        table.innerHTML = DOMString;
    }
}