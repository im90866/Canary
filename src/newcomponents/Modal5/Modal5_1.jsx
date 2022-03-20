import React from 'react'
import "../Modal/Modal.css"
import axios from 'axios'
import { useState} from 'react';

function Modal_1(props) {
    const folders = props.folderList
    const images = props.imageList
    const setFolders = props.setFolders
    const setImages = props.setImages

    const name = props.name

    const imageId = props.imageId
    const folderId = props.folderId

    const closeModal = props.closeModal

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

        console.log(renameFolder + " " + folderId)

        await axios.post("http://localhost:8000/renameFolder/", request).then((res) => {
          if (res.data["error"]) {
            console.log(res.data['error'])
          }
          else {
            let newFolderList = folders.slice()
            for(let x = 0; x < folders.length;++x) {
              if((folders[x])['folderID'] == folderId) {
                (newFolderList[x])['folderName'] = renameFolder
                break
              }
            }
            setFolders(newFolderList)
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
          else {
            let newImageList = images.slice()
            for(let x = 0; x < images.length;++x) {
              console.log((images[x])['imageID'] + " " + imageId)
              if((images[x])['imageID'] == imageId) {
                (newImageList[x])['fileName'] = renameImage
                break
              }
            }
            setImages(newImageList)
          }
        })
      }
    }

  return (
  
    <div>
      <div className="modalBackground">
        <div className="modalContainer5">
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>
          <div className="title">
            <h1 className='create-title5'>Rename File</h1>
          </div>
          <div className="body">
            <input type="text" 
                  className='change-text10'  
                  name="Rename" 
                  placeholder='Rename'
                  onKeyUp={event => setRenameVal(event.target.value)}
            /><br></br>

            <div className="div">
              <button className='folder-btn5' onClick={() => {Rename(); 
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