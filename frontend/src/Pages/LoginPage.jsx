import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiURL } from "../api/api";
import DefaultPage from "../components/DefaultPage";

export default function LoginPage(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const doLogin = (event) => {
        event.preventDefault()

        fetch(apiURL + "/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then((resp => resp.json()))
            .then(result => {
                if (result.err) {
                    setError("There was a problem with your login")
                } else {
                    setError("")

                    const token = result.token
                    props.setToken(token)
                    navigate("/")
                }
            })
            .catch(() => console.log("error catch"))
            .finally(() => {
                setEmail("")
                setPassword("")
            })
    }

    return (
        <DefaultPage title="Login">
            <form>
                <label htmlFor="email-input">E-Mail:</label>
                <input type="email" id="email-input" value={email} onChange={(e) => setEmail(e.target.value)} />

                <br />

                <label htmlFor="password-input">Password:</label>
                <input type="password" id="password-input" value={password} onChange={(e) => setPassword(e.target.value)} />

                <br />

                <button className="login-btn" onClick={doLogin}>Login</button>

                <br />

                {error && <p className="error-message">{error}</p>}
            </form>

            <br />

            <Link to="/register">Create an Account</Link>

        </DefaultPage>
    )
}