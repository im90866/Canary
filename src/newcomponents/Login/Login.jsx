import React from "react";
import { useState } from 'react';
import SignUp from '../SignUp/SignUp';

import { useNavigate } from 'react-router-dom';
import './Login.css'

import axios from "axios";

function Login() {
  const navigate = useNavigate()

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false)
  const [valid, setValid] = useState(false)

  const handleUserNameInputChange = (e) => {
    setValues({ ...values, username: e.target.value })
  }
  const handlePasswordInputChange = (e) => {
    setValues({ ...values, password: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (values.username && values.password) {
      setValid(true);
      axios.post("http://localhost:8000/login/", {
        'username': String(values.username),
        'password': String(values.password),
      })
        .then((res) => {
          if (res.data["success"]) {
            console.log('Succesfully logged in')
            setCookie("username", values.username, 2)
            navigate('/home')
          }
          else
            console.log("Error: " + res.data["error"])
        })
    }

    setSubmitted(true);
  }
  return (
    <div>

      <div className="form-container sign-in-container">
        <form action="#" onSubmit={handleSubmit}>
          <h1 className='app-name'>Canary</h1>

          <input type="text" placeholder="Username" onChange={handleUserNameInputChange} value={values.username} className="username" />
          {submitted && !values.username ? <span id="user-name-error">Please enter your username</span> : null}
          <input type="password" placeholder="Password" className="password" onChange={handlePasswordInputChange}
            value={values.password} />
          {submitted && !values.password ? <span id="password-error">Please enter your password</span> : null}
          <h5>Forgot your password?</h5>
          <button type="submit">Sign In</button>
        </form>
      </div>

    </div>


  )
}

function setCookie(cname, cvalue, hours) {
  const d = new Date();
  d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default Login