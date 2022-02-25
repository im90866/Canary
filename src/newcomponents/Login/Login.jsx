import React from "react";
import {useState} from 'react';
import SignUp from '../SignUp/SignUp';
import{Link, useNavigate}from 'react-router-dom';
import    './Login.css'
function Login() {
    

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
    const handleSubmit=(e)=>{
      e.preventDefault();  
      if( values.username && values.password){
        setValid(true);
      }
      setSubmitted(true);
    }
  return (
    <div>
      

	<div className="form-container sign-in-container">
		<form action="#" onSubmit={handleSubmit}>
			<h1 className='app-name'>Canary</h1>
			
			<input type="text" placeholder="Username"  onChange={handleUserNameInputChange}  value={values.username} className="username24"/>
		{submitted && !values.username ?<span id="user-name-error">Please enter your username</span>:null}
			<input type="password" placeholder="Password"  className="password"  onChange={handlePasswordInputChange}
            value={values.password}/>
		{submitted && !values.password?<span id="password-error">Please enter your password</span> :null}
			<h5>Forgot your password?</h5>
			<Link to ="/home"><button type="submit">Sign In</button></Link>
		</form>
	</div>
	
</div>


  )
}

export default Login