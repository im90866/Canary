import React from 'react'
import "./Modal3.css"
function Modal3({ closeModal}) {
  return (
    <div>
             <div className="modalBackground2">
        <div className="modalContainer3">
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
            <h1 className='create-title3'>Are You Sure You Want To<br></br> Delete Your Account</h1>
          </div>
         
       
           <div className="div3">
           <button className='folder-btn3'>Yes</button>
           <button className='folder-btn3'>Cancel</button>
           </div>
         
         
           
         
        </div>
      </div>
    </div>
  )
}

export default Modal3