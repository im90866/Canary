import React, { useState, useRef } from 'react'
import axios from 'axios'
import "./Modal12.css"
import { BsFillCloudUploadFill } from "react-icons/bs";

function Modal12(props) {
  const closeModal = props.closeModal

  const [fileVal, setFileVal] = useState("")
  const [image64, setImage64] = useState("")
  const [caption, setCaption] = useState("")
  const [imagePresent, setImagePresent] = useState(false)
  const fileRef = useRef();
  

  const [image, setImage] = useState({
    selectedFile: null,
    imageFile: null,
    'images64': null,
  });

  const postImage = async (imageID) => {
    const request = {
      'imageString': image64,

      'fileName': fileVal['name'],
      'uploadedTime': fileVal['lastModifiedDate'],
      'uploader': String(getCookie('username')),
      'fileSize': fileVal['size'],
      'fileType': fileVal['type'],
    }

    await axios.post('http://localhost:8000/uploadImageWorkspace/', request).then((res) => {
      console.log(res)
      if (res.data['success']) {
        const req = {
          'metadataID': res.data['imageID'],
          "caption": caption,
          'uploader': String(getCookie('username')),
          'userID': String(getCookie('userID')),
        }
        
        console.log("HOOOHHAAA")
        axios.post("http://localhost:8000/postImage/", req).then((res) => {
          closeModal(false)
          window.location.reload();
        })
      }
    });
  }

  const handleCaptionChange = (e) => {
    setCaption(e.target.value)
  }

  const fileSelect = async (event) => {
    var file = event.target.files[0]
    setFileVal(file)

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
    <div onClick={e => e.stopPropagation()}>
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
              <div className="post-img-cropper13" onClick={() => fileRef.current.click()}>
                <input
                  ref={fileRef}
                  onChange={fileSelect}
                  multiple={false}
                  type="file"
                  hidden
                />
                <BsFillCloudUploadFill className="upload-imgg" />
                <p className='upload-text'>Upload images from your device</p>
              </div>
          }

          <input
            type="text"
            placeholder='Enter a caption'
            className='change-text150'
            value={caption}
            onChange={handleCaptionChange}
          />
          <div className="div">
            <button className='folder-btn61' onClick={postImage}
            >Post
            </button>
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


export default Modal12