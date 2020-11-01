module.exports = {
    appData: {
        metadata: JSON.parse(localStorage.getItem('metadata')) || {},
        items: JSON.parse(localStorage.getItem('items')) || [],
        cashFlow: JSON.parse(localStorage.getItem('cashFlow')) || [],
        userPreferences: JSON.parse(localStorage.getItem('userPreferences')) || []
    },

    save(key) {
        localStorage.setItem(key, JSON.stringify(this.appData[key]));
    },

    registerItem(data) {
        this.appData.items.push(data);
        this.save('items');
    },

    addItem(index, ammount) {
        this.appData.items[index].stok += ammount;
        this.save('items');
    },

    subtractItem(index, ammount) {
        this.appData.items[index].stok -= ammount;
        this.save('items');
    },

    removeItem(index) {
        this.appData.items.splice(index, 1);
        this.save('items');
    },

    recordCashFlow(data) {
        this.appData.cashFlow.push(data);
        this.save('cashFlow');
    }
}