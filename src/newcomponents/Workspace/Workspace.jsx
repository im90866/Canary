import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import "./Workspace.css"
import { BsImageFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";

import { Link, useParams} from "react-router-dom";
import { useState, useEffect} from "react"
import axios from "axios"

import Dropdown from '../Dropdown/Dropdown';

function Workspace() {
  const [openDropdown, setOpenDropdown] = useState(false);

  const projectId  = useParams()['id']
  const [folders, setFolders] = useState([])
  const [images, setImages] = useState([])

  const getFolders = async () => {
    await axios.get("http://localhost:8000/getFolders/" + projectId)
      .then((res) => {
        if (res.data["success"]) {
          console.log(res)
          return (res.data['folderList'])
        }
        else
          console.log("Error: " + res.data["error"])
      })
  }

  useEffect(() => {
    const getAll = async () => {
      const allFolders = await getFolders()
      if (allFolders)
        setFolders(allFolders)
    }
    getAll();
  }, [openDropdown])

  const addFolder = async (folder) => {
    console.log(folder)
    const request = {
      ...folder
    }

    axios.post("http://localhost:8000/createFolder/", request).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
    })

    const getAll = async () => {
      const allFolders = await getFolders()
      setFolders(allFolders)
    }
    getAll();
  }

  return (
    <div>
      <Topbar/>
      <Sidebar/>
      <div className="workspace-container">
        <div className="workspace">
          <div className="workspace-title">
            <h1 className="wtitle">WorkSpace</h1>
            <div className="btn-grp">
              <button className="wbtn">Upload</button>
              <button className="wbtn1"onClick={() =>
                  setOpenDropdown(true)}><span className='btn-text'>New Folder</span></button>
            </div>
          </div>
        </div>
      </div>

      {openDropdown && <Dropdown closeModal={setOpenDropdown} />} 

      <div className="folder">
        {
          folders.map(folder =>
            <div className="folders" key={folder.id}>
              <Link to={`/mainspace/${folder.id}`}> <BsImageFill className='folder-icon' /></Link>
              <div className="folder-info">
                <h3 className='folder-text'>{folder.name}</h3>
                <BsThreeDots className='three-dots' />
              </div>
            </div>
          )
        }
        
      </div> 
        
        
        
    </div>
  )
}

export default Workspace