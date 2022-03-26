import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import "./Modal6.css"

function Modal6(props) {
  const username = props.username
  const closeModal = props.closeModal
  const navigate = useNavigate()

  const [code, setCode] = useState("")

  const handleCodeInputChange = (e) => {
    setCode(e.target.value)
  }

  const verifyCode = async () => {
    const req = {
      'username': username,
      'signCode': code
    }

    console.log(req)

    await axios.post('http://localhost:8000/verifySignup/', req).then((res) => {
      console.log(res)
      if(res.data['success']){
        closeModal(false)
        setCookie("username", res.data['username'], 2)
        setCookie("userID", res.data['userID'], 2)
        navigate('/home')
      }
    });
  }

  useEffect(() => {
    console.log('jalapeno sauce')
  }, [])
 
  return (
    <div>
      <div className="bodyyy">
        <div className="modalBackground6">
          <div className="modalContainer6">
            <div className="titleCloseBtn6">
           </div>

          <div className="title6">
            <h1 className="code-conformation">Email Verification</h1>
            <p className='six-digit1'>A 6-digit code is being sent to your email confiriming the details</p>
          </div>

          <div className="div6">
            <input 
              type="digit" 
              value={code}  
              onChange={handleCodeInputChange} 
              className='digit12' 
              maxLength="6" 
              size="1" 
              min="0" 
              max="9" 
              pattern="[0-9]"  
            />
          </div>
          <div className="timers">
            <h3 className="timer1">Time Remaining 10:30</h3>
          </div>

          <h4 className='resend'>
            Didn't receive the code yet? 
            <Link to ="/codeconfirmation">
              Resend code
            </Link>
          </h4>

          <button className='folder-btn60' onClick={verifyCode}>Verify Account</button>
          <Link to="/" className='back-login' >Back to login</Link>
  
          </div>
        </div>
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

export default Modal6