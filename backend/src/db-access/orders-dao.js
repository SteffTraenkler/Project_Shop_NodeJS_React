// findAll, findbyID, findbyCustomer, findallofDate, find alloflastchange

const { ObjectId } = require('mongodb')
const { getDB } = require('./getDB')

async function findAllOrders() {
    const db = await getDB()
    const orders = await db.collection('orders').find().toArray()
    return orders
}

async function findOrderById(id) {
    const db = await getDB()
    const order = await db.collection('orders').findOne({ _id: new ObjectId(id) })
    return order
}

async function findOrderByCustomer(customer) {
    const db = await getDB()
    const orderByCustomer = await db.collection('orders').find({ customer: customer })
    return orderByCustomer
}

async function insertOneOrder(order) {
    const db = await getDB()
    const newOrder = await db.collection('orders').insertOne(order)
    return newOrder
}

async function updateOrderProducts(orderId, productsId) {
    const db = await getDB()
    return db.collection('orders').updateOne(
        { _id: new ObjectId(orderId) },
        { $push: { products: productsId } }
    )
}

module.exports = {
    findAllOrders,
    findOrderById,
    findOrderByCustomer,
    insertOneOrder,
    updateOrderProducts
}