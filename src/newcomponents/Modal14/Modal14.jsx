import React from 'react'
import "./Modal14.css"
function Modal14({closeModal}) {
  return (
    <div>
          <div className="modalBackground" id='modalBackground'>
        <div className="modalContainer14">
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>
        
        <div className="img-workspacee">
            <img src="/images/avatar4.png" alt="" className='wimg1' />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Modal14