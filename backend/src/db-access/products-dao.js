const { ObjectId } = require('mongodb')
const { getDB } = require('./getDB')

async function findAllProducts() {
    const db = await getDB()
    const products = await db.collection('products').find().toArray()
    return products
}

async function findProductById(id) {
    const db = await getDB()
    const product = db.collection('products').findOne({ _id: new ObjectId(id) })
    return product
}

async function insertOneProduct(product) {
    const db = getDB()
    const newProduct = db.collection('products').insertOne(product)
    return newProduct
}

module.exports = {
    findAllProducts,
    findProductById,
    insertOneProduct
}