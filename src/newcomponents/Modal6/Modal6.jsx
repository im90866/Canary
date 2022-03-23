import React from 'react'
import { Link } from 'react-router-dom'
import "./Modal6.css"
function Modal6() {
  return (
    <div>
    <div className="modalBackground6">
<div className="modalContainer6">
 <div className="titleCloseBtn6">
  
 </div>
 <div className="title6">
 <p className='six-digit1'>A 6-digit code is being sent to your email confiriming the details</p>
 </div>


  <div className="div6">
  <input type="digit" className='digit12' maxlength="6" size="1" min="0" max="9" pattern="[0-9]" />
  
 
  </div>

  <button className='folder-btn60'>Submit Details</button>
  

</div>
</div>
</div>
  )
}

export default Modal6