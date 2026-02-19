const fs = require('fs');
const path = require('path');

const ordersData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'salesOrders.json'), 'utf8'));

const OrderModel = {
    getAll: () => ordersData,
    getById: (id) => ordersData.find(o => o.DocEntry === id)
};

module.exports = OrderModel;
