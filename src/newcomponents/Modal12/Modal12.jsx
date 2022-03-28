import React, { useState, useRef } from 'react'
import "./Modal12.css"
import {BsFillCloudUploadFill} from "react-icons/bs";

function Modal12({closeModal}) {
  const [image64, setImage64] = useState("")
  const [imagePresent, setImagePresent] = useState(false)
  const fileRef = useRef();

  const [image, setImage] = useState({
    selectedFile: null,
    imageFile: null,
    'images64': null,
  });

  const fileSelect = async (event) => {
    var file = event.target.files[0]

    const image64 = await base64(file)
    setImage({
      selectedFile: file,
    })

    setImage64(image64)
    setImagePresent(true)
  }

  const base64 = (file) => {
    return new Promise(function (resolve, reject) {
      console.log(file.name)
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (file) {
        console.log(file)
        setImage({
          'image64': String(file.target.result)
        })
        resolve(file.target.result)
      }
    })
  }

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
          {
            imagePresent
            ?
            <img src={image64} width={300} height={300}></img>
            :
            <div className="post-img-cropper13"  onClick={() => fileRef.current.click()}>
              <input
                  ref={fileRef}
                  onChange={fileSelect}
                  multiple={false}
                  type="file"
                  hidden
                />
              <BsFillCloudUploadFill className="upload-imgg"/>
              <p className='upload-text'>Upload images from your device</p>
            </div>
          }
          

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