import React from 'react'
import "../Modal/Modal.css"
import axios from 'axios'
import { useState} from 'react';

function Modal5(prop) {
  const imageID = prop.image.imageID
  const imageVal = prop.image.imageVal
  const closeModal = prop.closeModal
  const makeChange = prop.makeChange
  const projectId = prop.projectID

  const [caption, setCaption] = useState("")


  const postImage = async (imageID) => {
    console.log(projectId)
    const req = {
      'projectID': projectId,
      'metadataID': imageID,
      "caption": caption,
    }

    console.log("HOOOHHAAA")
    await axios.post("http://localhost:8000/postImage/", req).then((res) => {
     console.log(res)
    })

  }

  const handleCaptionChange = (e) => {
    setCaption(e.target.value)
  }


  return (
  
    <div>
      <div className="modalBackground">
        <div className="modalContaine3">
          
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>

          <div className="post-img-cropper1">
            <img src={imageVal} alt=""  className='post-img'/>
          </div>

          <input 
            type="text" 
            placeholder='Enter a caption' 
            className='change-text15' 
            value={caption}
            onChange={handleCaptionChange}
          />
              
          <div className="body">
            

            <div className="div">
              <button className='folder-btn6' onClick={() => { 
                  postImage(imageID);closeModal(false)}}>Post
              </button>
            </div>
          </div>         
        </div>
      </div>
    </div>
  )
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export default Modal5