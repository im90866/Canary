import React, { useEffect, useState } from 'react';
import "../Login/Login.css"
import { Link, useNavigate } from 'react-router-dom';
import Modal3 from '../Modal3/Modal3'
import axios from 'axios';
import Modal6 from '../Modal6/Modal6';
import Modal18 from '../Modal18/Modal18';

function SignUp(props) {
  const navigate = useNavigate()

  const changeContainer = props.changeVal

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [submitted, setSubmitted] = useState(false)
  const [validate, setValidate] = useState(false)
  const [openModal, setOpenModal] = useState(false);

  const [waitModal, setWaitModal] = useState(false)

  const handleUserNameInputChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value)
  }
  const handleEmailInputChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // ADD CODE FOR ERROR CHECKING HERE
    if (username && password && email) {
      setWaitModal(true)
      axios.post("http://localhost:8000/signup/", {
        'username': String(username),
        'password': String(password),
        'email': String(email),
      }).then((res) => {
        if (res.data["success"]) {
          setWaitModal(false)
          window.sessionStorage.setItem("username", username);
          window.sessionStorage.setItem("password", password);
          window.sessionStorage.setItem("email", email);
          navigate('/codeconfirmation')
        }
        else {
          setWaitModal(false)
          console.log("Error " + res.data["error"])
          document.getElementById('user-name-error1').style.display = 'flex'
        }
      })
    }

    //changeContainer(false)
    setSubmitted(true)
  }

  useEffect(() => {
    sessionStorage.clear();
    setValidate(
      email !== "" &&
      username !== "" &&
      password !== "" &&
      username.length >= 5
    )

    if (username !== "" && username.length < 5)
      document.getElementById('user-name-error2').style.display = 'flex'
    else
      document.getElementById('user-name-error2').style.display = 'none'

    if (password !== "" && password.length < 8)
      document.getElementById('password-error1').style.display = 'flex'
    else
      document.getElementById('password-error1').style.display = 'none'

  }, [username, password, email])

  return (
    <div>
      <div className="form-container sign-up-container">
        <form action="#" onSubmit={handleSubmit}>
          <h1 className='app-name'>Canary</h1>

          <input type="text" placeholder="Username" onChange={handleUserNameInputChange} value={username} className="username" />
          {
            submitted && !username
              ?
              <span id="user-name-error" style={{ color: 'red' }}>Please enter your username</span>
              :
              null
          }
          <span id="user-name-error2" style={{ color: 'red', display: 'none' }}>Username must be atleast 5 characters</span>
          <span id="user-name-error1" style={{ color: 'red', display: 'none' }}>Username Already Exists!</span>
          <input type="email" placeholder="Email" onChange={handleEmailInputChange} className="email" value={email} />

          {
            submitted && !email
              ?

              <span id="email-error" style={{ color: 'red' }}>Please enter your email</span>
              :
              null
          }
          <input type="password" placeholder="Password" className="password" onChange={handlePasswordInputChange}
            value={password} />

          {
            submitted && !password
              ?
              <span id="password-error" style={{ color: 'red' }}>Please enter your password</span>
              :
              null
          }
          <span id="password-error1" style={{ color: 'red', display: 'none' }}>Password must be atleast 8 characters</span>

          <button className='signup' type="submit" >Sign Up</button>
        </form>
      </div>
      {openModal && <Modal6 username={username} email={email} password={password} closeModal={setOpenModal} />}
      {waitModal && <Modal18 />}
    </div>
  )
}
/*<Link to="/registrationpage">*/

export default SignUp