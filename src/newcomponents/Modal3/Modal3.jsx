import React from 'react'
import "./Modal3.css"
function Modal3({ closeModal}) {
  return (
    <div>
             <div className="modalBackground2">
        <div className="modalContainer2">
          <div className="titleCloseBtn2">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}
            >
              x
            </button>
          </div>
          <div className="title2">
            <h1 className='create-title2'>Are You Sure You Want To<br></br> Delete Your Account</h1>
          </div>
         
       
           <div className="div2">
           <button className='folder-btn2'>Yes</button>
           <button className='folder-btn3'>Cancel</button>
           </div>
         
         
           
         
        </div>
      </div>
    </div>
  )
}

export default Modal3