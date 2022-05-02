import { useNavigate } from "react-router-dom";


export default function ProductView({ product }) {
    const navigate = useNavigate()

    return (
        <article onClick={() => navigate("/products/" + product._id)}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title} - {product.price}</h3>
            {product.isLimited && <div className="product-is-limited">Only a few left!</div>}
            {product.outOfStock && <div className="product-is-out-of-stock">Out of Stock</div>}

        </article>
    )
}