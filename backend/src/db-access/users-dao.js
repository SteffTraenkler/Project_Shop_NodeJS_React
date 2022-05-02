const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");


async function findUserById(id) {
    const db = await getDB()
    const foundUser = await db.collection('users').findOne({ _id: new ObjectId(id) })
    return foundUser
}

async function findUserByEmail(email) {
    const db = await getDB()
    const user = await db.collection('users').findOne({ email: email })
    return user
}

async function insertOneUser(user) {
    const db = await getDB()
    const insertUserResult = await db.collection('users').insertOne(user)
    return insertUserResult
}

async function updateUserWishlist(userId, productId) {
    const db = await getDB()
    return db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $push: { wishlist: productId } }
    )
}

async function updateUserOrders(userId, orderId) {
    const db = await getDB()
    return db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $push: { orderlist: orderId } }
    )
}

module.exports = {
    findUserById,
    findUserByEmail,
    insertOneUser,
    updateUserWishlist,
    updateUserOrders
}