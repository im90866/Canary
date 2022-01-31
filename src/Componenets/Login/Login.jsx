import React from "react";
import "./Login.css"
import {useState} from 'react';
 import{Link, useNavigate}from 'react-router-dom'
import axios from 'axios';

function Login() {
    let navigate = useNavigate()
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
        if( values.username && values.password){
            
            setValid(true);
            axios.post("http://localhost:8000/login/", {
              'username': String(values.username),
              'password': String(values.password),
            })
            .then((res) => {
              if(res.data["success"]) { 
                console.log('Succesfully logged in')
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

export default Login;