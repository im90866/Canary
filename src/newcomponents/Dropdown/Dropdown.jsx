import React from 'react'
import "./Dropdown.css"
import axios from 'axios'
import { useState } from 'react'

export default function Dropdown(props) {
  const closeModal = props.closeModal
  const folderPath = props.path
  const projectId = props.projId
  const setFolders = props.setFolder
  const folders = props.folders
  

  const [folderName, setFolderName] = useState("") 

  const addFolder = async (folder) => {
    console.log(folder)
    const request = {
      'currentFolderPath' : folderPath,
      'projectID' : projectId,
      ...folder
    }

    await axios.post("http://localhost:8000/createFolder/", request).then((res) => {
      if (res.data["success"]) {
        let newFolders = folders.slice()
    
        const val = {
          'folderName' : folder['folderName'],
          'folderID' : res.data['folderID']
        }

        newFolders.unshift(val)
        setFolders(newFolders)
      }
    })
  }

  return (
    <div>
      <div className="modalBackground3">
        <div className="modalContainerdrop">
          <div className="titleCloseBtn3">
            <button className='crossbtnss'
              onClick={() => {
                closeModal(false);
              }}
            >
              x
            </button>
          </div>
          <div className="title3">
          <h1 className='create-titledrop'>New Folder</h1>
            <input type="text" className='creat-folder-title' placeholder='Enter folder name' 
              onChange={event => setFolderName(event.target.value)}/>
          </div>
         
       
          <div className="drop">
            {/* <button className='folder-btn3' onClick={() => {addFolder({ "folderName" : folderName }); closeModal(false)}}>
              <span className='folder-title3'>Create Folder</span>
            </button> */}
            <button className="fbtn" onClick={() => {addFolder({ "folderName" : folderName }); closeModal(false)}}>Create Folder</button>
          </div>
         
         
           
         
        </div>
      </div>
    </div>
  )
}
