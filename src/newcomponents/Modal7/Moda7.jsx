import React from 'react'
import "./Modal7.css"
function Moda7(props) {
  const closeModal = props.closeModal
  return (
    <div>
      <div className="modalBackground7">
        <div className="modalContainer7">
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

export default Moda7