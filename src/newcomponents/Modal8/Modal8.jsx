import React, { useRef }from 'react'
import "./Modal8.css"
import {BsClipboard} from "react-icons/bs";
function Modal8({closeModal}) {
 
  const textAreaRef = useRef(null);

  const copyLink = () => {
    textAreaRef.current.select();
    navigator.clipboard.writeText('Copy this text to clipboard')
  }

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
              <textarea 
                type="text" 
                ref={textAreaRef}
                className='change-text106'  
                value={window.location.href}
                name="Rename" 
                placeholder='https://www.gmail.com'
              />
            
              <BsClipboard className='clipboard' onClick={copyLink}/>
            </div>
          </div>   

        </div>
      </div>
    </div>
  )
}

export default Modal8