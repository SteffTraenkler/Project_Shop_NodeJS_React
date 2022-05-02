const { insertOneOrder } = require('../../db-access/orders-dao')
const { createOrder } = require('../../domain/Order')

function createNewOrder(orderInfo) {
    const order = createOrder(orderInfo)

    return insertOneOrder(order)
}

module.exports = { createNewOrder }