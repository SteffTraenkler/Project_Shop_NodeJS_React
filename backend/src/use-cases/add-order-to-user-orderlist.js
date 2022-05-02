const OrdersDAO = require('../db-access/orders-dao')
const UsersDAO = require('../db-access/users-dao')
const { createOrder } = require('../domain/Order')
const { makeUser } = require('../domain/User')

async function addOrderToUserOrderList({ userId, orderId }) {
    const [foundUser, foundOrder] = await Promise.all([
        UsersDAO.findUserById(userId),
        OrdersDAO.findOrderById(orderId),
    ])

    if (!foundUser) {
        throw { message: "User with id " + userId + " was not found!" }
    }

    if (!foundOrder) {
        throw { mesage: "Order with id " + orderId + " doesn't exist" }
    }

    const user = makeUser(foundUser)
    const order = createOrder(foundOrder)

    await UsersDAO.updateUserOrders(user._id, order._id)

    const updatedUser = await UsersDAO.findUserById(userId)
    return updatedUser.orderlist
}

module.exports = {
    addOrderToUserOrderList
}