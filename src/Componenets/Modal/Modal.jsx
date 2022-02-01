import React from 'react';
import "./Modal.css"
import { useState, useEffect } from "react"
import api from '../../API/projects'
import { useParams } from 'react-router-dom';

function Modal({ closeModal }) {

  const {projectId} = useParams()

  const [folders, setFolders] = useState([])
  const [name, setName] = useState("")
  const [images, setImages] = useState({
    image1: "",
    image2: ""
  })

  const addFolder = async (folder) => {
    console.log(folder)
    const request = {
      ...folder,
      projectId: projectId
    }

    const response = await api.post("/folders", request)
    console.log(response)
    closeModal(false)
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button className='cross'
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Create Folder</h1>
        </div>
        <div className="body">
          <input type="text" placeholder='Name of the folder' className='folder-name' value={name} onChange={event => setName(event.target.value)}/>
          <div className="div">
            <button className='folder-btn' onClick={() => addFolder({name, images})}>Create Folder</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Modal;
