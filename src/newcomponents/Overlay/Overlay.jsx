import React, { useState, useEffect} from 'react';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import "../Login/Login.css"

function Overlay(prop) {
  let setLog = prop.logger
  let log = prop.check
  const[isContainerActive,setIsContainerActive]=useState(false);
  const signUpButton=()=>{
      setIsContainerActive(true);

  };
  const signInButton=()=>{
      setIsContainerActive(false);

  };

  useEffect(() => {
    //axios.get("http://localhost:8000/delete")
    //axios.get("http://localhost:8000/print")
  }, [])
  return (
   
    <div>
       <body className="login">
      
   
      <div className={`container ${isContainerActive?"right-panel-active":""}`} id="container" >
        <SignUp changeVal={setIsContainerActive}/>
        <Login logger={setLog}/>
        <div className="overlay-container">
		      <div className="overlay">
			      <div className="overlay-panel overlay-left">
				      <h1 className='account'>Already have an Account?</h1>
				      <p className='para1'>To keep connected with us please login with your personal info</p>
				      <button className="signinghost" id="signIn" onClick={signInButton} >Sign In</button>
			      </div>
			      <div className="overlay-panel overlay-right">
				      <h1>Are you a new user?</h1>
				      <p>Create a new account and start a journey with us!</p>
				      <button className="signupghost" id="signUp" onClick={signUpButton} >Sign Up </button>
			      </div>
	    	  </div>
	      </div>
      </div>
      </body>
    </div>
  )
}

export default Overlay