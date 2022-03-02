import React from "react";
import "./Login.css"
import {useState} from 'react';
 import{Link, useNavigate}from 'react-router-dom'
import axios from 'axios';
import crypto from 'crypto-js'

function Login(prop) {
    let navigate = useNavigate()

    const setLog = prop.logger
    const[values,setValues]=useState({
        username:"",
        password:"",
    });
    const[submitted,setSubmitted]=useState(false)
    const[valid,setValid]=useState(false)
  
    const handleUserNameInputChange=(e)=>{
        setValues({...values,username:e.target.value})
    }
    const handlePasswordInputChange=(e)=>{
        setValues({...values,password:e.target.value})
    }
    const handleSubmit=event=>{
        event.preventDefault()
        
        const secret = crypto.MD5(values.username).toString()
        const encrypted = crypto.AES.encrypt(values.username, '343');
        
        //const decrypted = crypto.AES.decrypt(encrypted, secret).toString(crypto.enc.Utf8);


        if( values.username && values.password){
            setValid(true);
            axios.post("http://localhost:8000/login/", {
              'username': String(values.username),
              'password': String(values.password),
            })
            .then((res) => {
              if(res.data["success"]) { 
                console.log('Succesfully logged in')

                setLog(true)
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
    <>
      <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit} >
          <div className="logo">
              <h2>Canary</h2>
          </div>

          <input
            id="user-name"
            onChange={handleUserNameInputChange}
            value={values.username}
            className="form-field"
            type="text"
            placeholder="username"
            name="username"
          />
        
          {submitted && !values.username ? <span id="user-name-error">Please enter your username</span> :null} 
      
          <input
            id="email"
            onChange={handlePasswordInputChange}
            value={values.password}
            className="form-field"
            type="password"
            placeholder="password"
            name="password"
          />
        
          {submitted && !values.password ? <span id="password-error">Please enter your password</span> :null }
          
          {submitted && values.password && !valid ? <span id="password-error">Incorrect username or password</span> :null }

          <br></br> 
          <button className="form-field" type="submit"  >
            Login
          </button>

          <div className="forgot-password">
            <Link to="/"> 
              <h3>Forgot Password?</h3>
            </Link>
          </div>
          <h4>or</h4>

        </form>

        <button className="sign" type="submit">
          <Link to="/signup">
            Sign Up
          </Link> 
        </button>
      </div>
    </>
  );
}

function setCookie(cname, cvalue, hours){
  let expires = "expires="+ "2147483647";
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

export default Login;