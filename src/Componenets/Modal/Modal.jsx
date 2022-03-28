import React from 'react';
import "./Modal.css"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios'

function Modal({ closeModal }) {

  const projectID = (useParams())['id']

  const [folders, setFolders] = useState([])
  const [name, setName] = useState("")
  const [images, setImages] = useState({
    image1: "",
    image2: ""
  })

  const addFolder = async (folder) => {
    console.log(folder)
    const request = {
      'projectID' : projectID,
      'projectName' : name,
      'curFolder' : '&root&'
    }


    await axios.post("http://localhost:8000/createfolder/", request).then((res) =>{
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
      else
        console.log("sucess")
    })

    // const response = await api.post("/folders", request)
    // console.log(response)
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
