import { useNavigate } from "react-router-dom";


export default function ProductView({ product }) {
    const navigate = useNavigate()

    return (
        <article className="main-shop-wrapper" onClick={() => navigate("/products/" + product._id)}>
            <div className="image-wrapper"><img src={product.image} alt={product.title} /></div>
            <div className="main-shop-txt-wrapper">
                <h3>{product.title} - {product.price}</h3>
                {product.isLimited && <div className="product-is-limited">Only a few left!</div>}
                {product.outOfStock && <div className="product-is-out-of-stock">Out of Stock</div>}
            </div>
        </article>
    )
}