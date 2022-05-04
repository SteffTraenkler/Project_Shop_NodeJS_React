const dotenv = require('dotenv')
const { MongoClient } = require('mongodb')
dotenv.config()

const url = process.env.DB_URL
const client = new MongoClient(url)

const databaseName = process.env.DB_NAME

let dbReference;

async function getDB() {
    if (dbReference) {
        return dbReference
    }
    try {
        const connectedClient = await client.connect()
        const db = connectedClient.db(databaseName)
        dbReference = db;
        return dbReference
    } catch (err) {
        console.log(err);
        throw { err: "Failed to connect to database" }
    }
}


module.exports = {
    getDB
}

// async function getDB2() {
//     if (!dbReference) {
//         const connectedClient = await client.connect()
//         const db = connectedClient.db(databaseName)
//         dbReference = db
//     }

//     return dbReference
// }