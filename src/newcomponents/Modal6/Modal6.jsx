import React, { useState } from 'react'
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

  return (
    <div>
      <div className="modalBackground6">
        <div className="modalContainer6">
          <h3 className="title6">Verify your email</h3>
            <div className="titleCloseBtn6"></div>
          
            <div className="title6">
              <p className='six-digit1'>Enter the 6-digit code sent to your email below</p>
            </div>

            <div className="div6">
            <input 
              type="digit" 
              className='digit12' 
              onChange={handleCodeInputChange}  
              value={code}
              maxlength="6" 
              size="1" 
              min="0" 
              max="9" 
              pattern="[0-9]" 
            />
          </div>
          <button className='folder-btn60' onClick={verifyCode}>Submit Details</button>
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