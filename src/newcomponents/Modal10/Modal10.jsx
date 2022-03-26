import React from 'react'
import"./Modal10.css"
function Modal10({closeModal}) {
  return (
    <div>
            <div className="modalBackground">
        <div className="modalContainer10">
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>
         
         <div className="block-title">
             <h1 className="block-tt">Block User?</h1>
             <p className='block-pp'>Blocking Kyle, stops messages, follows, and comments. You can still view each other’s profiles.</p>
         </div>
        
         <div className="div-blockbtns">
             <button className="bbtn1">Cancel</button>
             <button className="bbtn1">Block</button>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Modal10