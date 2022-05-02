import { useState } from "react";
import { Link } from "react-router-dom";
import { apiURL } from "../api/api";
import DefaultPage from "../components/DefaultPage";

export default function RegistrationPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const doRegister = async (event) => {
        event.preventDefault()

        if (password.length < 8) {
            setError("Password must be at least 8 characters!")
            return
        }

        if (password !== passwordConfirm) {
            setError("Password must match with password Confirmation!")
            return
        }

        try {
            const response = await fetch(apiURL + "/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })

            const result = await response.json()
            console.log("result", result.err);

            if (result.err) {
                console.log("result.err should be set now...");
                setError(result.err)
            } else if (result.acknowledged === true && result.insertedId) {
                console.log(result);
                setSuccess("Your account was created successfully, please login now.")

                setError("")

                setName("")
                setEmail("")
                setPassword("")
                setPasswordConfirm("")

            }
        } catch (error) {
            console.log("Error:", error);
            setError("There was a problem with your account registration")
        }
    }

    return (
        <DefaultPage title="Create a new Account">
            <form>
                <label htmlFor="name-input">
                    Name:
                </label>
                <input type="text" id="name-input" value={name} onChange={(e) => setName(e.target.value)} />

                <br />

                <label htmlFor="email-input">Email:</label>
                <input type="email" id="email-input" value={email} onChange={(e) => setEmail(e.target.value)} />

                <br />

                <label htmlFor="password-input">Password:</label>
                <input type="password" id="password-input" value={password} onChange={(e) => setPassword(e.target.value)} />

                <br />

                <label htmlFor="password-confirm-input">Confirm Password:</label>
                <input type="password" id="password-confirm-input" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />

                <br />

                <button className="login-btn" onClick={doRegister}>Create my Account</button>

                <br />
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

            </form>

            <h3>Already have an account?</h3>
            <Link to="/login">Login</Link>

        </DefaultPage>
    )
}