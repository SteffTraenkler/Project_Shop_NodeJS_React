import { Link } from 'react-router-dom'

export default function Navigation(props) {
    return (
        <nav>
            <div>
                <Link to={"/"}>Shop</Link>{' '}
                <Link to={"/wishlist"}>Your Wishlist</Link>
            </div>
            <div>
                {props.token
                    ? <div>
                        <Link to={"/admin/addProduct"}>Add Product</Link>
                        <Link to={"/admin/dashboard"}>Dashboard</Link>
                        <button className='logout-btn' onClick={props.logout}>Logout</button>
                    </div>
                    : <Link to={"/login"} className='login-btn'>Login</Link>}
            </div>
        </nav>
    )
}