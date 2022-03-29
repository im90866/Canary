import React from 'react'
import "./Modal14.css"
function Modal14(props) {
  const closeModal = props.closeModal
  const imageVal = props.imageVal

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
            <img src={imageVal} alt="" className='wimg1' />
        </div>
        </div>
    
    </div>
  )
}

export default Modal14