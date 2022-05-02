const ProductsDAO = require('../db-access/products-dao')
const OrdersDAO = require('../db-access/orders-dao')
const { makeProduct } = require('../domain/Product')
const { createOrder } = require('../domain/Order')

async function addProductToOrder({ orderId, productId }) {
    const [foundOrder, foundProduct] = await Promise.all([
        OrdersDAO.findOrderById(orderId),
        ProductsDAO.findProductById(productId)
    ])
    if (!foundOrder) {
        throw { message: "Order with id " + orderId + " was not found!" }
    }

    if (!foundProduct) {
        throw { message: "Product with id " + productId + " was not found!" }
    }

    const order = createOrder(foundOrder)
    const product = makeProduct(foundProduct)

    await OrdersDAO.updateOrderProducts(order._id, product._id)
    const updatedOrder = await OrdersDAO.findOrderById(orderId)
    return updatedOrder.products
}




module.exports = { addProductToOrder }