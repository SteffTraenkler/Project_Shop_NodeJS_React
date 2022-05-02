const ProductsDAO = require('../../db-access/products-dao')
const UsersDAO = require('../../db-access/users-dao')
const OrdersDAO = require('../../db-access/orders-dao')
const { productToProductView } = require('../helpers/function')


async function showUserInfo({ userId }) {
    const foundUser = await UsersDAO.findUserById(userId)
    if (!foundUser) {
        throw new Error("User doesn't exist anymore!")
    }

    //prepare wishlist ids to product-views, by fetching each product by it's id from database
    const allFindByIdPromises = foundUser.wishlist.map(productId => ProductsDAO.findProductById(productId))
    const allProducts = await Promise.all(allFindByIdPromises)
    const allProductsView = allProducts.filter(p => p !== null).map(productToProductView)

    return {
        name: foundUser.name,
        email: foundUser.email,
        wishlist: allProductsView,
        _id: foundUser._id
    }
}

module.exports = { showUserInfo }