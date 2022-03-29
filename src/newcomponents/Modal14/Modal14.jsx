import React from 'react'
import "./Modal14.css"
function Modal14({closeModal}) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
          <div className="modalBackground" id='modalBackground'>
       
          <div className="titleCloseBtn14">
            <button className='cross14'
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
  )
}

export default Modal14