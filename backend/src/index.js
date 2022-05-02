const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const { listAllOrders } = require('./use-cases/orders/list-all-orders')
const { listAllProducts } = require('./use-cases/products/list-all-products')
const { createNewOrder } = require('./use-cases/orders/create-new-order')
const { createNewProduct } = require('./use-cases/products/create-new-product')
const { addProductToOrder } = require('./use-cases/add-product-to-order')
const { showOrder } = require('./use-cases/orders/show-order')
const { showProduct } = require('./use-cases/products/show-product')
const { addProductToUserWishlist } = require('./use-cases/add-product-to-user-wishlist')
const { addOrderToUserOrderList } = require('./use-cases/add-order-to-user-orderlist')
const { registerUser } = require('./use-cases/users/register-user')
const { login } = require('./use-cases/users/login-user')
const { doAuthMiddleware } = require('./auth/auth-middleware')
const { showUserInfo } = require('./use-cases/users/show-user-info')

const PORT = process.env.PORT || 1818
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (_, res) => {
    res.send('server is on and works')
})

//get all Orders/Products
app.get('/api/orders/all', async function getAllOrdersController(_, res) {
    try {
        const orders = await listAllOrders()
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message || 'Unknown error while reading orders' })
    }
})

app.get('/api/products/all', async function getAllProductsController(_, res) {
    try {
        const products = await listAllProducts()
        res.json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message || 'Unknown error while reading products' })
    }
})

// Show Details of Order / Product
app.get('/api/orders/single/:id', async (req, res) => {
    try {
        const id = req.params.id

        const order = await showOrder({ orderId: id })
        res.json(order)
    } catch (error) {
        res.status(500).json({ err: error.message || 'Unknown error while reading order' })
    }
})

app.get('/api/products/single/:id', async (req, res) => {
    try {
        const id = req.params.id

        const product = await showProduct({ productId: id })
        res.json(product)
    } catch (error) {
        res.status(500).json({ err: error.message || 'Unknown error while reading product' })
    }
})

// Create a new Order / Product
app.post('/api/orders/add', async (req, res) => {

    try {
        const orderInfo = req.body

        const order = await createNewOrder(orderInfo)
        res.json(order)

    } catch (error) {
        res.status(500).json({ err: error.message || 'Unknown error while creating new order' })
    }
})

app.post('/api/products/add', async (req, res) => {

    try {
        const productInfo = req.body

        const product = await createNewProduct(productInfo)
        res.json(product)
    } catch (error) {
        res.status(500).json({ err: error.message || 'Unknown error while creating new product' })
    }
})

// add Product to Order
app.post('/api/orders/addProduct', async (req, res) => {
    try {
        const orderId = req.body.orderId
        const productId = req.body.productId

        const productList = await addProductToOrder({ orderId, productId })
        res.status(201).json({ productList })
    } catch (error) {
        res.status(500).json({ err: error.message || 'Unknown error while adding product to order' })
    }
})

app.post('/api/users/addToWishlist', async (req, res) => {
    try {
        const userId = req.userClaims.sub //req.body.userId
        const productId = req.body.productId

        const wishlist = await addProductToUserWishlist({ userId, productId })
        res.status(201).json({ wishlist })
    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while adding product to user wishlist" })
    }
})

app.post('api/users/addOrderToUser', async (req, res) => {
    try {
        const userId = req.userClaims.sub
        const orderId = req.body.orerId

        const orderlist = await addOrderToUserOrderList({ userId, orderId })
        res.status(201).json({ orderlist })
    } catch (error) {
        res.status(500).json({ err: error.message || 'Unknown error while adding order to user orderlist' })
    }
})

//Login and Registration

app.post("/api/users/register", async (req, res) => {
    try {
        const userInfo = req.body

        const user = await registerUser(userInfo)
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message || "Unknown error while registering new user" })
    }
})

app.get("/api/users/login", async (req, res) => {
    try {
        const email = res.body.email
        const password = req.body.password

        const token = await login({ email, password })
        res.json({ token })
    } catch (error) {
        console.log(error);
        res.json(404).json({ err: "Not found" })
    }
})

app.get("/api/user/userInfo", doAuthMiddleware, async (req, res) => {
    try {
        const userId = req.userClaims.sub

        const userInfo = await showUserInfo({ userId })
        res.status(201).json(userInfo)
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: error.message || "Unknown error while getting your user info" })
    }
})

app.listen(PORT, () => console.log('Server listening on Port', PORT))