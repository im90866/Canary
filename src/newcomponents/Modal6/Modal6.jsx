import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Modal18 from '../Modal18/Modal18'

import "./Modal6.css"

function Modal6(props) {
  const [username, setUsername] = useState(props.username)
  const [password, setPassword] = useState(props.password)
  const [email, setEmail] = useState(props.email)

  const [waitModal, setWaitModal] = useState(false)

  const closeModal = props.closeModal

  const navigate = useNavigate()

  const [code, setCode] = useState("")

  const handleCodeInputChange = (e) => {
    setCode(e.target.value)
  }

  const verifyCode = async () => {
    if(email && !(username)){

    }
    else {
      const req = {
        'username': window.sessionStorage.getItem("username"),
        'email': email,
        'signCode': code
      }

      await axios.post('http://localhost:8000/verifySignup/', req).then((res) => {
      console.log(res)
      if(res.data['success']){
        setCookie("username", res.data['username'], 2)
        setCookie("userID", res.data['userID'], 2)
        window.sessionStorage.clear()
        navigate('/home')
        console.log('yes')
      }
    });
    }
    
  }

  const Ref = useRef(null);
  
    // The state for our timer
  const [timer, setTimer] = useState('00:00:00');


  const getTimeRemaining = (e) => {
      const total = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / 1000 * 60 * 60) % 24);
      return {
          total, hours, minutes, seconds
      };
  }
  
  
  const startTimer = (e) => {
      let { total, hours, minutes, seconds } 
                  = getTimeRemaining(e);
      if (total >= 0) {

          // update the timer
          // check if less than 10 then we need to 
          // add '0' at the begining of the variable
          setTimer(
              (hours > 9 ? hours : '0' + hours) + ':' +
              (minutes > 9 ? minutes : '0' + minutes) + ':'
              + (seconds > 9 ? seconds : '0' + seconds)
          )
      }
  }

  const resendCode = () => {
    setWaitModal(true)
    axios.post("http://localhost:8000/resendCode/", {
          'username': window.sessionStorage.getItem("username"),
          'password': window.sessionStorage.getItem("password"),
          'email': window.sessionStorage.getItem("email"),
    }).then((res) => {
        if(res.data["success"]) { 
          setWaitModal(false)
          clearTimer(getDeadTime());
        }
        else  
          console.log("Error "+res.data["error"])
    })    
  }

  const clearTimer = (e) => {

      // If you adjust it you should also need to
      // adjust the Endtime formula we are about
      // to code next    
      setTimer('00:03:00');

      // If you try to remove this line the 
      // updating of timer Variable will be
      // after 1000ms or 1sec
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
          startTimer(e);
      }, 1000)
      Ref.current = id;
  }

  const getDeadTime = () => {
      let deadline = new Date();

      // This is where you need to adjust if 
      // you entend to add more time
      deadline.setSeconds(deadline.getSeconds() + 60 * 3);
      return deadline;
  }

  const goBack = () => {
    window.sessionStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    clearTimer(getDeadTime());
    if(props == {}){
      setUsername(window.sessionStorage.getItem("username"))
      setPassword(window.sessionStorage.getItem("password"))
      setEmail(window.sessionStorage.getItem("email"))
    }
    console.log(window.sessionStorage.getItem("username"))
    if(window.sessionStorage.getItem("username") == undefined &&
       window.sessionStorage.getItem("password") == undefined && 
       window.sessionStorage.getItem("email") == undefined && username == undefined)
      navigate('/')
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
            <p className='six-digit1'>A 6-digit code is being sent to your email confirming the details</p>
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
          {
            !waitModal
            ?
            <div className="timers">
              <h3 className="timerbefore">Time Remaining: {timer}</h3>
            </div>
            :
            <div className="timers">
              <h3 className="timerbefore">Time Remaining: {'00:00:00'}</h3>
            </div>
          }
          

          <h4 className='resend'>
            Didn't receive the code yet?
         
          </h4>
          <h4 className='resend2' onClick={resendCode}>Resend code</h4>

          <button className='folder-btn60' onClick={verifyCode}>Verify Account</button>
          <div className='back-login' onClick={goBack}>Back to Login</div>
  
          </div>
        </div>
      </div>
      {waitModal && <Modal18 />}
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