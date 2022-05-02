const UsersDAO = require('../db-access/users-dao')
const ProductsDAO = require('../db-access/products-dao')
const { makeUser } = require('../domain/User')
const { makeProduct } = require('../domain/Product')



async function addProductToUserWishlist({ userId, productId }) {
    const [foundUser, foundProduct] = await Promise.all([
        UsersDAO.findUserById(userId),
        ProductsDAO.findProductById(productId),
    ])

    if (!foundUser) {
        throw { message: "User with id " + userId + " was not found" }
    }

    if (!foundProduct) {
        throw { message: "Product with id " + productId + " was not found" }
    }

    const user = makeUser(foundUser)
    const product = makeProduct(foundProduct)

    await UsersDAO.updateUserWishlist(user._id, product._id)

    const updatedUser = await UsersDAO.findUserById(userId)
    return updatedUser.wishlist
}

module.exports = { addProductToUserWishlist }