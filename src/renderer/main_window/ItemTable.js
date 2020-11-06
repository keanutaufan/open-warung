const Storage = require('./Storage');

module.exports = {
    load() {
        let data = Storage.appData.items;
        let table = document.getElementById('barang-table');

        let DOMString = `
            <tr class="barang-table-header barang-table-row">
                <th class="barang-table-heading">Nama Barang</th>
                <th class="barang-table-heading">Stok</th>
                <th class="barang-table-heading">Min</th>
                <th class="barang-table-heading">Harga Beli</th>
                <th class="barang-table-heading">Harga Jual</th>
                <th class="barang-table-heading"></th>
                <th class="barang-table-heading"></th>
                <th class="barang-table-heading"></th>
            </tr>
        `;

        data.forEach((element, index) => {
            DOMString += `
                <tr class="barang-table-row">
                    <td class="barang-table-data" data-visualizer">${element.barang}</td>
                    <td class="barang-table-data" data-visualizer">${element.stok}</td>
                    <td class="barang-table-data" data-visualizer">${element.min}</td>
                    <td class="barang-table-data" data-visualizer">${new Intl.NumberFormat('id').format(element.beli)}</td>
                    <td class="barang-table-data" data-visualizer">${new Intl.NumberFormat('id').format(element.jual)}</td>
                    <td class="barang-table-data" table-button"><span onclick="addItem(${index})" class="btn-add"><img src="../../assets/icons/btn-add.svg" class="img-add"></span></td>
                    <td class="barang-table-data" table-button"><span onclick="subtractItem(${index})" class="btn-subtract"><img src="../../assets/icons/btn-subtract.svg" class="img-subtract"></span></td>
                    <td class="barang-table-data" table-button"><span onclick="editItem(${index})" class="btn-edit"><img src="../../assets/icons/btn-edit.svg" class="img-edit"></span></td>
                    <td class="barang-table-data" table-button"><span onclick="removeItem(${index})" class="btn-delete"><img src="../../assets/icons/btn-delete.svg" class="img-delete"></span></td>
                </tr>
            `;
        });

        table.innerHTML = DOMString;
    }
}