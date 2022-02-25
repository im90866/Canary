import {useState} from 'react';
import React from 'react'
import "../Login/Login.css"
import { Link } from 'react-router-dom';
function SignUp() {
  
  const[values,setValues]=useState({
    email:"", 
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
const handleEmailInputChange=(e)=>{
  setValues({...values,email:e.target.value})
}
const handleSubmit=(e)=>{
e.preventDefault();  
if( values.username && values.password && values.email){
  setValid(true);
}
setSubmitted(true);
}
  return (
    <div>
        <div className="form-container sign-up-container">
    <form action="#" onSubmit={handleSubmit}>
        <h1 className='app-name'>Canary</h1>
        
       
        <input type="text" placeholder="Username" onChange={handleUserNameInputChange}  value={values.username} className="username24" />
        
        {submitted && !values.username ?<span id="user-name-error">Please enter your username</span>:null}
        <input type="email" placeholder="Email" onChange={handleEmailInputChange}   className="email" value={values.email}/>
        {submitted && !values.email?<span id="email-error">Please enter your email</span> :null}
        <input type="password" placeholder="Password"  className="password" onChange={handlePasswordInputChange}
            value={values.password}/>
            	{submitted && !values.password?<span id="password-error">Please enter your password</span> :null}
        <Link to="/registrationpage"><button  type="submit">Sign Up</button></Link>
    </form>
</div>
</div>
  )
}

export default SignUp