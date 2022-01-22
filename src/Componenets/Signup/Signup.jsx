import React, { useEffect } from "react"
import "./Signup.css"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from "react-bootstrap"

export default function Signup() {

    const [fName, setfName] = useState("")
    const [lName, setlName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const [validate, setValidate] = useState(false)
    useEffect(() => setValidate(
        fName !== "" &&
        lName !== "" &&
        email !== "" &&
        username !== "" &&
        password1 !== "" &&
        username.length > 5 &&
        password1 === password2
    ), [username, password1, password2, fName, lName, email])

    return (
        <>
            <div className="form-container">
                <Form className="register-form">
                    <div className="logo">
                        <h2>Canary</h2>
                    </div>

                    <input
                        onChange={event => setfName(event.target.value)}
                        value={fName}
                        id="first-name"
                        className="form-field"
                        type="text"
                        placeholder="First Name"
                        name="First Name"
                    />

                    <input
                        onChange={event => setlName(event.target.value)}
                        value={lName}
                        id="last-name"
                        className="form-field"
                        type="text"
                        placeholder="Last Name"
                        name="Last Name"
                    />

                    <input
                        onChange={event => setEmail(event.target.value)}
                        value={email}
                        id="user-name"
                        className="form-field"
                        type="text"
                        placeholder="username"
                        name="username"
                    />


                    <input
                        onChange={event => setUsername(event.target.value)}
                        value={username}
                        id="email"
                        className="form-field"
                        type="email"
                        placeholder="Email"
                        name="Email"
                    />

                    <input
                        onChange={event => setPassword1(event.target.value)}
                        value={password1}
                        id="password1"
                        className="form-field"
                        type="password"
                        placeholder="password"
                        name="password"
                    />

                    <input
                        onChange={event => setPassword2(event.target.value)}
                        value={password2}
                        id="password2"
                        className="form-field"
                        type="password"
                        placeholder="Re-type Password"
                        name="Re-type Password"
                    />

                    <br></br>
                    <Link to="/">
                        <button className="form-field" type="submit" disabled={!validate}>
                            Sign Up
                        </button>
                    </Link>
                    <div className="forgot-password">
                        Already Registered?
                        <Link to="/">
                            Log in
                        </Link>
                    </div>
                </Form>
            </div>
        </>
    )
}