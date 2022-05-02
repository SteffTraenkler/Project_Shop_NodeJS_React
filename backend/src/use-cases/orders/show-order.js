const { findOrderById } = require("../../db-access/orders-dao");


async function showOrder({ orderId }) {
    const order = await findOrderById(orderId)
    const orderView = orderToOrderView(order)
    return orderView
}

function orderToOrderView(order) {
    console.log('inside orderToOrderView', order)
    const orderCopy = { ...order }

    // delete orderCopy.sensitive Stuff you want show the user/customer!

    // orderCopy.newStuff you want to create

    return orderCopy
}

module.exports = {
    showOrder
}