module.exports = {
    appData: {
        metadata: JSON.parse(localStorage.getItem('metadata')) || {},
        account: JSON.parse(localStorage.getItem('account')) || {balance: 0},
        items: JSON.parse(localStorage.getItem('items')) || [],
        cashFlow: JSON.parse(localStorage.getItem('cashFlow')) || [],
        notes: JSON.parse(localStorage.getItem('notes')) || [],
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

    editItem(index, data) {
        this.appData.items[index] = data;
    },

    recordCashFlow(data) {
        this.appData.cashFlow.push(data);
        this.save('cashFlow');
    },

    removeCashFlow(index) {
        this.appData.cashFlow.splice(index, 1);
        this.save('cashFlow');
    },

    editCashflow(index, total, data) {
        this.appData.cashFlow[index].item = data;
        this.appData.cashFlow[index].total = total;
        this.save('cashFlow');
    },

    setBalance(value) {
        this.appData.account.balance = value;
        this.save('account');
    },

    addBalance(value) {
        this.appData.account.balance += value;
        this.save('account');
    },

    subtractBalance(value) {
        this.appData.account.balance -= value;
        this.save('account');
    },

    editProfile(name, location) {
        this.appData.account.name = name;
        this.appData.account.location = location;
        this.save('account');
    },

    addNote(note) {
        this.appData.notes.push(note);
        this.save('notes');
    },

    removeNote(index) {
        this.appData.notes.splice(index, 1);
        this.save('notes');
    },

    editNote(index, title, text) {
        this.appData.notes[index].title = title;
        this.appData.notes[index].text = text;
        this.save('notes');
    },

    loadBackup(data) {
        this.appData.metadata = data.metadata;
        this.appData.account = data.account;
        this.appData.items = data.items;
        this.appData.cashFlow = data.cashFlow;
        this.appData.notes = data.notes;
        this.appData.userPreferences = data.userPreferences;

        this.save('metadata');
        this.save('account');
        this.save('items');
        this.save('cashFlow');
        this.save('notes');
        this.save('userPreferences');
    }
}