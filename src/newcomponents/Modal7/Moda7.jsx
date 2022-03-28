import React from 'react'
import "./Modal7.css"
import { Link } from 'react-router-dom'
function Moda7(prop) {
  const setModal = prop.setModal
  const openModal = prop.modal

  const closeModal = () => {
    console.log(openModal)
    setModal(false)
  }

  return (
    <div>
      <div className="modalBackground6">
        <div className="modalContainer7">
          <div className="titleCloseBtn6">
            <button className='cross'
              onClick={() => {
                closeModal();
              }}
            >
              x
            </button>
          </div>


        
          <div className="title7">
   <h1 className="code-conformation1">Email Verification</h1>
 <p className='six-digit121'>A 6-digit code is being sent to your email confiriming the details</p>
 </div>


  <div className="div62">
  <input type="digit" className='digit12' maxlength="6" size="1" min="0" max="9" pattern="[0-9]" />
  </div>
  <div className="timers2">
  <h3 className="timer1">Time Remaining 10:30</h3>
  </div>
<h4 className='resend1'>Didn't receive the code yet? <Link to ="/codeconfirmation">Resend code</Link></h4>

  <button className='folder-btn601'>Verify Account</button>
  <Link to="/" className='back-login1'>Back to login</Link>
  
  
        </div>
      </div>
    </div>
  )
}

export default Moda7