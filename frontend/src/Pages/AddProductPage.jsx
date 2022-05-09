import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { apiURL } from "../api/api";
import DefaultPage from "../components/DefaultPage";

export default function AddProductPage(props) {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState([])
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [variations, setVariations] = useState([])
    const [productImage, setProductImage] = useState(null)
    const [stock, setStock] = useState()

    const [categoryBuffer, setCategoryBuffer] = useState([{ category: "" }])
    const [variationsBuffer, setVariationsBuffer] = useState([{ variations: "" }])

    const [error, setError] = useState("")

    const navigate = useNavigate()

    //input handler for the Category-Inputs
    const handleCatInputChange = (e, index) => {
        const { value } = e.target
        const catList = [...categoryBuffer]
        catList[index].category = value
        setCategoryBuffer(catList)
    }

    const handleCatAddClick = () => {
        setCategoryBuffer([...categoryBuffer, { category: "" }])
    }

    const handleCatRemoveClick = (index) => {
        const catList = [...categoryBuffer]
        catList.splice(index, 1)
        setCategoryBuffer(catList)
    }

    console.log(categoryBuffer);
    // end Category Input Handler

    //input handler for the variations inputs
    const handleVarInputChange = (e, index) => {
        const { value } = e.target
        const varList = [...variationsBuffer]
        varList[index].variations = value
        setCategoryBuffer(varList)
    }

    const handleVarAddClick = () => {
        setVariationsBuffer([...variationsBuffer, { variations: "" }])
    }

    const handleVarRemoveClick = (index) => {
        const varList = [...variationsBuffer]
        varList.splice(index, 1)
        setVariationsBuffer(varList)
    }
    //end Variations Input Handler
    const test = () => {
        setCategory(categoryBuffer.map((e) => {
            let x = e.category
            return x
        }))
        console.log("categor", JSON.stringify(category));
    }

    const addProduct = (event) => {
        event.preventDefault()

        setCategory(categoryBuffer.map((e) => {
            let x = e.category
            return x
        }))

        setVariations(variationsBuffer.map((e) => {
            let x = e.variations
            return x
        }))

        const formData = new FormData()

        formData.append("title", title)
        formData.append("category", JSON.stringify(category))
        formData.append("description", description)
        formData.append("price", price)
        formData.append("variations", JSON.stringify(variations))
        formData.append("productImage", productImage, productImage.name)
        formData.append("stock", stock)

        fetch(apiURL + "/api/products/add", {
            method: "POST",
            headers: {
                token: props.token
            },
            body: formData
        })
            .then(resp => resp.json())
            .then(result => {
                if (result.err) {
                    setError(result.err)
                } else if (result.acknowledged === true && result.insertedId) {
                    navigate("/products/" + result.insertedId)
                } else {
                    setError("Unknown error while adding product, please try again")
                }
            })
    }


    if (!props.token) {
        return <Navigate to="/" />
    } else return (
        <DefaultPage title="Add Product">
            <form>

                <label htmlFor="title-input">Product Name:</label>
                <input className="label-titles" type="text" id="title-input" value={title} onChange={(e) => setTitle(e.target.value)} />

                <br />
                <label className="label-titles" htmlFor="category-input-wrap">Categories</label>
                <div id="category-input-wrap">
                    {categoryBuffer.map((val, i) => {
                        return (
                            <div className="inner-inputs-wrap">
                                <input
                                    type="text"
                                    placeholder="Add Category"
                                    value={val.category}
                                    onChange={e => handleCatInputChange(e, i)}
                                />
                                {categoryBuffer.length !== 1 && <div className="remove-btn" onClick={() => handleCatRemoveClick(i)}>-</div>}
                                {(categoryBuffer.length < 6 && categoryBuffer.length - 1 === i) &&
                                    <div className="add-btn" onClick={handleCatAddClick}>+</div>}

                            </div>
                        )
                    })}
                </div>

                <label htmlFor="description-input">Description:</label>
                <br />
                <textarea id="description-input" cols="30" rows="2" placeholder="description..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                <br />

                <label htmlFor="price-input">Price:</label>
                <input id="price-input" type="number" value={price} placeholder="0€" onChange={(e) => setPrice(Number(e.target.value))} />
                {price < 0 && <div className="invalid-input">Price can't be below 0!</div>}

                <br />

                <label className="label-titles" htmlFor="var-input-wrap">Variations:</label>
                <div id="var-input-wrap">
                    {variationsBuffer.map((val, i) => {
                        return (
                            <div className="inner-inputs-wrap">
                                <input
                                    type="text"
                                    placeholder="Add Variation"
                                    value={val.variations}
                                    onChange={e => handleVarInputChange(e, i)}
                                />
                                {variationsBuffer.length !== 1 && <div className="remove-btn" onClick={() => handleVarRemoveClick(i)}>-</div>}
                                {(variationsBuffer.length < 20 && variationsBuffer.length - 1 === i) && <div className="add-btn" onClick={handleVarAddClick}>+</div>}
                            </div>
                        )
                    })}
                </div>

                <label className="fileInput-label" htmlFor="product-img-input">Product Image: </label>
                <br />
                <input type="file" id="product-img-input" onChange={(e) => setProductImage(e.target.files[0])} />

                <label htmlFor="product-stock-input">Stock:</label>
                <input type="number" id="product-stock-input" value={stock} onChange={(e) => setStock(Number(e.target.value))} />

                <button className="" onClick={addProduct}>Add Product</button>

                <br />

                {error && <p className="error-msg">{error}</p>}

                <p onClick={test}>test</p>
            </form>

        </DefaultPage>
    )

}