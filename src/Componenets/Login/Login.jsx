import React from "react";
import "./Login.css"
import { useState} from 'react';
 import{Link }from 'react-router-dom'

function Login() {
    const[values,setValues]=useState({
       
        username:"",
        password:"",
    });
    const[submitted,setSubmitted]=useState(false);
    const[valid,setValid]=useState(false);
  
    const handleUserNameInputChange=(e)=>{
        setValues({...values,username:e.target.value})
    }
    const handlePasswordInputChange=(e)=>{
        setValues({...values,password:e.target.value})
    }
    const handleSubmit=event=>{
        event.preventDefault();
        if( values.username && values.password){
            setValid(true);
        }
        setSubmitted(true);
    }
  return (
      <>
        <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Uncomment the next line to show the success message */}
        {/* {submitted  && valid ?  <div class="success-message">Success! Thank you for registering</div> :null} */}
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
       
        {/* Uncomment the next line to show the error message */}
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
      
        {/* Uncomment the next line to show the error message */}
        {submitted && !values.password ? <span id="password-error">Please enter your password</span> :null }
        
       <br></br> <button className="form-field" type="submit">
          <Link to="/home">
        Login
       </Link>
        </button>
        <div className="forgot-password">
       <Link to="/canary"> 
            <h3>Forgot Password?</h3>
         </Link>
            </div>
        <h4>or</h4>
        
      </form>
      <button className="sign">
        <Link to="/signup">
        Sign Up
        </Link> 
        </button>
    </div>
   </>
  );
}

export default Login;