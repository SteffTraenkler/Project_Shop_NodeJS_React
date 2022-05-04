import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiURL } from "../api/api";
import DefaultPage from "../components/DefaultPage";

export default function ProductDetailPage() {
    const { productId } = useParams()
    const [product, setProduct] = useState()
    const [error, setError] = useState("")

    useEffect(() => {
        fetch(apiURL + "/api/products/single/" + productId)
            .then(resp => resp.json())
            .then((foundProduct) => {
                if (foundProduct.message) {
                    return setError(foundProduct.message)
                } else {
                    return setProduct(foundProduct)
                }
            })
    }, [productId])


    return (
        <DefaultPage title={product ? product.title : "Product page"}>
            {product && <div className="product-detail-box">
                <div className="image-wrapper"><img src={product.image} alt={product.title} /></div>
                <div className="product-detail-info">
                    <h3>{product.title} - {product.price}€</h3>
                    <p>
                        {product.description}
                    </p>
                    <ul>
                        {product.variations.map(variation => <li>{variation}</li>)}
                    </ul>
                </div>
            </div>}

            <div>
                {error}
            </div>

            <Link to="/">Go back to Shop</Link>

        </DefaultPage>
    )
}

