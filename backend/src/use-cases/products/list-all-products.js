const { findAllProducts } = require('../../db-access/products-dao')
const { productToProductView } = require('../helpers/function')

async function listAllProducts() {
    const products = await findAllProducts()
    const productsView = products.map(productToProductView)
    console.log(productsView);
    return productsView
}

module.exports = { listAllProducts }