import React from 'react'
import "../Modal/Modal.css"
import axios from 'axios'
import { useState} from 'react';

function Modal_1({folderId, imageId, name, closeModal, makeChange}) {

    const [renameFolder, setRenameFolder] = useState("")
    const [renameImage, setRenameImage] = useState("")
  
    const setRenameVal = (e) =>{
        if(folderId !== ""){
            setRenameFolder(e)
            console.log(renameFolder)
            console.log(renameImage)
            console.log(imageId)
            console.log(folderId)
        }
        else{
            setRenameImage(e)
            console.log(renameFolder)
            console.log(renameImage)
            console.log(imageId)
            console.log(folderId)
        }
    }

    const Rename = async () =>{
      if(folderId !== ""){
        const request = {
          'folderID': folderId,
          'newName': renameFolder
        }

        await axios.post("http://localhost:8000/renameFolder/", request).then((res) => {
          if (res.data["error"]) {
            console.log(res.data['error'])
          }
        })
      }
      else {
        const request = {
          'imageID': imageId,
          'newName': renameImage
        }

        await axios.post("http://localhost:8000/renameImage/", request).then((res) => {
          if (res.data["error"]) {
            console.log(res.data['error'])
          }
        })
      }
      makeChange(true)
    }

  return (
  
    <div>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>
          <div className="title">
            <h1 className='create-title'>{name}</h1>
          </div>
          <div className="body">
            <input type="text" 
                  className='change-text10'  
                  name="Rename" 
                  placeholder='Rename'
                  onKeyUp={event => setRenameVal(event.target.value)}
            /><br></br>

            <div className="div">
              <button className='folder-btn' onClick={() => {Rename(); 
                  closeModal(false)}}>Rename
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

export default Modal_1