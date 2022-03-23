import React from 'react'
import "./Modal8.css"
import {BsClipboard} from "react-icons/bs";
function Modal8({closeModal}) {
  return (
    <div>
         <div className="modalBackground">
        <div className="modalContainer8">
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>
          <div className="title">
            <h1 className='create-title8'>Share</h1>
          </div>
          <div className="body1">
              <div className="bodyyy2">
            <input type="text" 
                  className='change-text100'  
                  name="Rename" 
                  placeholder='https://www.gmail.com'
                 
            />
            
           <BsClipboard className='clipboard'/>
           </div>
          </div>         
        </div>
      </div>
    </div>
  )
}

export default Modal8