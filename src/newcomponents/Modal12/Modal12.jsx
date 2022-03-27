import React from 'react'
import "./Modal12.css"
import {BsFillCloudUploadFill} from "react-icons/bs";
function Modal12({closeModal}) {
  return (
    <div>
         <div className="modalBackground">
        <div className="modalContainer12">
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>
          <div className="post-img-cropper13">
              <BsFillCloudUploadFill className="upload-imgg"/>
              <p className='upload-text'>Upload images from your device</p>
          </div>

          <input 
            type="text" 
            placeholder='Enter a caption' 
            className='change-text150' 
          
          />
              <div className="div">
              <button className='folder-btn61' 
                >Post
              </button>
            </div>  
      
        </div>
      </div>

    </div>
  )
}

export default Modal12