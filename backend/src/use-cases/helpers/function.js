function productToProductView(product) {
    return {
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.image || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5b9fc062-a34f-4892-93b7-90aa10431b4a/deqrnv8-3e0626e8-2c1d-447e-8402-b0b68e128c46.jpg/v1/fill/w_1280,h_1813,q_75,strp/len_kagamine___poltergeist_by_zajiyume_deqrnv8-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzViOWZjMDYyLWEzNGYtNDg5Mi05M2I3LTkwYWExMDQzMWI0YVwvZGVxcm52OC0zZTA2MjZlOC0yYzFkLTQ0N2UtODQwMi1iMGI2OGUxMjhjNDYuanBnIiwiaGVpZ2h0IjoiPD0xODEzIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvNWI5ZmMwNjItYTM0Zi00ODkyLTkzYjctOTBhYTEwNDMxYjRhXC96YWppeXVtZS00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.iriqtVufFP3AiIp2utS7RDZPKFGVWjYmiLLZtcohpTs",
        isAvailable: product.stock > 0,
        isLimited: product.stock < 10,
        outOfStock: product.stock === 0
    }
}

module.exports = {
    productToProductView
}