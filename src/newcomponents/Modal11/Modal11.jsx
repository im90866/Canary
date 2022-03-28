import React from 'react'
import "./Modal11.css"
function Modal11({closeModal}) {
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
             <h1 className="block-tt">Report User</h1>
             <p className='block-pp'>Why are you reporting this account?</p>
             <input type="text" 
                  className='change-text130'  
                  name="Report" 
                  placeholder='Report'
            />
         </div>
         <div className="div-blockbtns">
             <button className="bbtn1">Cancel</button>
             <button className="bbtn1">Report</button>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Modal11