const { findUserByEmail } = require("../../db-access/users-dao")
const { makeUser } = require("../../domain/User")
const { createPasswordHash, createToken } = require("../../utils/hash")

async function login({ email, password }) {
    const invalidLoginMsg = "Invalid login"

    //1. validate if user with this mail address exists
    const foundUser = await findUserByEmail(email)
    console.log("foundUser", foundUser);
    if (!foundUser) {
        throw new Error(invalidLoginMsg)
    }

    //2. validate password
    const user = makeUser(foundUser)
    const passwordHash = createPasswordHash(password, user.passwordSalt)
    const correctPassword = user.passwordHash === passwordHash
    if (!correctPassword) {
        //3. send error for incorrect password
        throw new Error(invalidLoginMsg)
    }

    //SUCCESS:
    //3. success -> create token and send it (if mail and pw okay)
    const token = createToken(user)
    return token
}

module.exports = { login }