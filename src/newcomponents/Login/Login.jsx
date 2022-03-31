import React from "react";
import { useState, useEffect } from 'react';
import SignUp from '../SignUp/SignUp';

import { Link, useNavigate } from 'react-router-dom';
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
            setCookie("userID", res.data['userID'], 2)
            window.sessionStorage.clear()
            navigate('/home')
          }
          else
            console.log("Error: " + res.data["error"])
          document.getElementById('password-error1').style.display = "flex"
        })
    }

    setSubmitted(true);
  }

  useEffect(() => {
    

    
  }, [values.username, values.password])

  return (
    <div>

      <div className="form-container sign-in-container">
        <form action="#" onSubmit={handleSubmit}>
          <h1 className='app-name'>Canary</h1>

          <input type="text" placeholder="Username" onChange={handleUserNameInputChange} value={values.username} className="username" />
          {
          submitted && !values.username 
          ? 
          <span style={{ color: 'red' }} id="user-name-error">Please enter your username</span> 
          : 
          null
          }
          {/* <span style={{ color: 'red' }} id="user-name-error1">Username does not exist!</span>  */}
          <input
            type="password"
            placeholder="Password"
            className="password"
            onChange={handlePasswordInputChange}
            value={values.password}
            onKeyDown={() => {
              document.getElementById('password-error1').style.display = 'none'
            }}
          />
          {
            submitted && !values.password
              ?
              <span style={{ color: 'red' }} id="password-error">Please enter your password</span>
              :
              null}
          <span style={{ color: 'red', display: 'none' }} id="password-error1">You've entered wrong password</span>
          <h5 className="forgot">
            <Link to="/forgotpassword">
              Forgot your password?
            </Link>
          </h5>
          <button className="signin" type="submit">Sign In</button>
        </form>
      </div>

    </div>


  )
}

function setCookie(cname, cvalue, hours) {
  const d = new Date();
  d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default Login