import React from 'react'
import { Link } from 'react-router-dom'
import "./Modal6.css"
import { useState, useEffect, useRef } from "react";



function Modal6() {
 
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
  <input type="digit" className='digit12' maxlength="6" size="1" min="0" max="9" pattern="[0-9]" />
  </div>
  <div className="timers">
  <h3 className="timer1">Time Remaining 10:30</h3>
  </div>
<h4 className='resend'>Didn't receive the code yet? <Link to ="/codeconfirmation">Resend code</Link></h4>

  <button className='folder-btn60'>Verify Account</button>
  <Link to="/" className='back-login'>Back to login</Link>
  

</div>
</div>
</div>
</div>
  )
}

export default Modal6