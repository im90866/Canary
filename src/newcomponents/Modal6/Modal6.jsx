import React from 'react'
import "./Modal6.css"
function Modal6({ closeModal}) {
  return (
    <div>
    <div className="modalBackground6">
<div className="modalContainer6">
 <div className="titleCloseBtn6">
   <button className='cross'
     onClick={() => {
       closeModal(false);
     }}
   >
     x
   </button>
 </div>
 <div className="title6">
 <p className='six-digit'>A 6-digit code is being sent to your email confiriming the details</p>
 </div>


  <div className="div6">
  <input type="digit" className='digit' />
  <input type="digit" className='digit' />
  <input type="digit" className='digit' />
  <input type="digit" className='digit' />
  <input type="digit" className='digit' />
  <input type="digit" className='digit' />
 
  </div>

  <button className='folder-btn6'>Submit Details</button>
  

</div>
</div>
</div>
  )
}

export default Modal6