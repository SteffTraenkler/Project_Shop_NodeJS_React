import { useEffect } from "react";
import { useState } from "react";
import { apiURL } from "../api/api";
import DefaultPage from "../components/DefaultPage";
import ProductView from "../components/ProductView";

export default function AllProductsPage(props) {
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        const alertError = (error) => alert(error.message)
        fetch(apiURL + "/api/products/all")
            .then(resp => resp.json())
            .then(products => {
                if (products.message) {
                    return alertError(products)
                } else {
                    setAllProducts(products)
                }
            })
            .catch(alertError)
    }, [])

    return (
        <DefaultPage title="Shop">
            <section className="product-all-grid-view">
                {allProducts.map(product => <ProductView key={product._id} product={product} />)}
            </section>
        </DefaultPage>
    )
}