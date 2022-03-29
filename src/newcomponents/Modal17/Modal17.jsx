import React from 'react'

import { Link} from 'react-router-dom'
function Modal17({closeModal}) {
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
             <h1 className="block-tt">Unblock User?</h1>
             <p className='block-pp'>Unblocking Kyle,you can message, follows and comment. You can  view each other’s profiles.</p>
         </div>
        
         <div className="div-blockbtns1">
             <button className="bbtn1">Cancel</button>
             <button className="bbtn1"><Link to="/profile/:userID">Unblock</Link></button>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Modal17