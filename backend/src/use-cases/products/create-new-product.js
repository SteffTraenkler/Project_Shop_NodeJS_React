const { insertOneProduct } = require('../../db-access/products-dao')
const { makeProduct } = require('../../domain/Product')

function createNewProduct(productInfo) {
    const product = makeProduct(productInfo)

    return insertOneProduct(product)
}

module.exports = { createNewProduct }