import { useEffect } from "react";
import { useState } from "react";
import { apiURL } from "../api/api";
import DefaultPage from "../components/DefaultPage";
import ProductView from "../components/ProductView";

export default function AllProductsPage(props) {
    const [allProducts, setAllProducts] = useState([])
    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        const alertError = (error) => setErrMsg(error.message)
        fetch(apiURL + "/api/products/all")
            .then(resp => resp.json())
            .then(products => {
                if (products.message) {
                    console.log(products.message);
                    return alertError(products)
                } else {
                    setAllProducts(products)
                    setErrMsg("")
                }
            })
            .catch(alertError)
    }, [])

    return (
        <DefaultPage title="Shop">
            <section className="product-all-grid-view">
                {allProducts.map(product => <ProductView key={product._id} product={product} />)}
            </section>
            {errMsg && <section className="error-message">
                <h1>{errMsg}</h1>
            </section>}
        </DefaultPage>
    )
}