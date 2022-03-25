import React from 'react'
import "./Modal7.css"
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

          <div className="title6">
            <p className='six-digit'>A 6-digit code is being sent to your email confiriming the details</p>
          </div>

          <div className="div61">
            <input type="digit" className='digit12' maxlength="6" size="1" min="0" max="9" pattern="[0-9]" />
          </div>

          <button className='folder-btn6'>Submit Details</button>
  
        </div>
      </div>
    </div>
  )
}

export default Moda7