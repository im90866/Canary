import React from 'react'
import "./Dropdown.css"
import axios from 'axios'
import { useState } from 'react'

export default function Dropdown(props) {
  const closeModal = props.closeModal
  const currentFolder = props.curFolder
  const projectId = props.projId
  const setFolders = props.setFolder
  
  const makeChange = props.makeChange

  const [folderName, setFolderName] = useState("") 

  const getFolders = async () => {
    await axios.get("http://localhost:8000/getWorkspace/" + projectId + '/' + currentFolder)
      .then((res) => {
        if (res.data["success"]) {
          setFolders(res.data['folderList'])
        }
        else
          console.log("Error: " + res.data["error"])
      })
  }

  const addFolder = async (folder) => {
    console.log(folder)
    const request = {
      'curFolder' : currentFolder,
      'projectID' : projectId,
      ...folder
    }

    axios.post("http://localhost:8000/createFolder/", request).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
    })

    const getAll = async () => {
      const allFolders = await getFolders()
    }
    getAll();
    makeChange(true)
  }

  return (
    <div>
      <div className="modalBackground3">
        <div className="modalContainer3">
          <div className="titleCloseBtn3">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}
            >
              x
            </button>
          </div>
          <div className="title3">
          <h1 className='create-title3'>New Folder</h1>
            <input type="text" className='creat-folder-title' placeholder='Enter folder name' 
              onChange={event => setFolderName(event.target.value)}/>
          </div>
         
       
          <div className="div3">
            <button className='folder-btn3' onClick={() => {addFolder({ "folderName" : folderName }); closeModal(false)}}>
              <span className='folder-title3'>Create Folder</span>
            </button>
          </div>
         
         
           
         
        </div>
      </div>
    </div>
  )
}
