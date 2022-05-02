const { findAllOrders } = require('../../db-access/orders-dao')

async function listAllOrders() {
    const orders = await findAllOrders()
    const ordersView = orders.map(o => ({
        _id: o._id,
        date: o.date,
        products: o.products || [],
        state: o.state,
        price: o.price,
        customer: o.customer,
        changedAt: o.changedAt || 0
    }))
    return ordersView
}

module.exports = { listAllOrders }