function createOrder({ _id, date, products, state, price, customer, changedAt }) {
    if (!Array.isArray(products)) {
        throw new Error("Order products must be an array.")
    }

    return {
        _id,
        date: date || Date.now(), //first created at
        products: products || [],
        state,
        price,
        customer,
        changedAt: changedAt || 0
    }
}

console.log(Date.now());

module.exports = {
    createOrder
}