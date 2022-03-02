import React, {useEffect, useState} from 'react';
import "../Login/Login.css"
import {useNavigate} from 'react-router-dom';

import axios from 'axios';

function SignUp(props) {
  const navigate = useNavigate()

  const changeContainer = props.changeVal

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const[submitted,setSubmitted]=useState(false)
  const [validate, setValidate] = useState(false)

  const handleUserNameInputChange=(e)=>{
    setUsername(e.target.value)
  }
  const handlePasswordInputChange=(e)=>{
    setPassword(e.target.value)
  }
  const handleEmailInputChange=(e)=>{
    setEmail(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // ADD CODE FOR ERROR CHECKING HERE

    axios.post("http://localhost:8000/signup/", {
          'username': String(username),
          'password': String(password),
          'email': String(email),
    }).then((res) => {
        if(res.data["success"]) { 
          console.log('sucess')
          navigate('/')
        }
        else  
          console.log("Error "+res.data["error"])
    })
    
    //changeContainer(false)
    setSubmitted(true)
  }

  useEffect(() => setValidate(
    email !== "" &&
    username !== "" &&
    password !== "" 
    ), [username, password, email])

  return (
    <div>
      <div className="form-container sign-up-container">
        <form action="#" onSubmit={handleSubmit}>
          <h1 className='app-name'>Canary</h1>
       
          <input type="text" placeholder="Username" onChange={handleUserNameInputChange}  value={username} className="username" />
          {submitted && !username ?<span id="user-name-error">Please enter your username</span>:null}

          <input type="email" placeholder="Email" onChange={handleEmailInputChange}   className="email" value={email}/>

          {submitted && !email?<span id="email-error">Please enter your email</span> :null}
          <input type="password" placeholder="Password"  className="password" onChange={handlePasswordInputChange}
              value={password}/>
          
          {submitted && !password?<span id="password-error">Please enter your password</span> :null}
          <button className='btn' type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}
/*<Link to="/registrationpage">*/

export default SignUp