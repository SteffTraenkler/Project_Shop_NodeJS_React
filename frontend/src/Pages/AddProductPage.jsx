import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DefaultPage from "../components/DefaultPage";

export default function AddProductPage(props) {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState([""])
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [variations, setVariations] = useState([])
    const [productImage, setProductImage] = useState(null)
    const [stock, setStock] = useState()

    const [error, setError] = useState("")

    const navigate = useNavigate()


    const handleCatInputChange = (e, index) => {
        const name = e.target.value
        const catList = [...category, name]
        setCategory(catList)
    }

    console.log(category);

    if (!props.token) {
        return <Navigate to="/" />
    } else return (
        <DefaultPage title="Add Product">
            <form>

                <label htmlFor="title-input">Product Name:</label>
                <input type="text" id="title-input" value={title} onChange={(e) => setTitle(e.target.value)} />

                {category.map((val, i) => {
                    return (
                        <div>
                            <input type="text" placeholder="Add Category" value={val} onChange={e => handleCatInputChange(e, i)} />
                        </div>
                    )
                })}

            </form>

        </DefaultPage>
    )

}