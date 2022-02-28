import React from 'react';
import axios from 'axios';

import { FaSearch } from 'react-icons/fa'

import { Link, useParams } from "react-router-dom";
import { FaBackspace, FaHistory } from 'react-icons/fa';

import { MdSettings } from "react-icons/md"
import { GoGraph } from "react-icons/go"

import { AiFillEdit } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import "./Workspace.css"
import { RiChatSmile2Fill } from "react-icons/ri"
import { BsImageFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import Modal from "../Modal/Modal"
import { useState, useEffect } from "react"
import axios from "axios";

function Workspace() {

  const projectId  = useParams()["id"]
  const [openModal, setOpenModal] = useState(false);
  const [currentFolder, setCurrentFolder] = useState("root")
  const [folderList, setFolderList] = useState([])
  const [imageList, setImageList] = useState([])

  const getFolder = async () => {
    await axios.get("http://localhost:8000/getWorkspace/" + String(projectId) + '/&root&/')
      .then((res) => {
        if (res.data["success"]) {
          console.log(res.data)
          setFolderList(res.data['folderList'])
        }
        else
          console.log("Error: " + res.data["error"])
      })
  }

  useEffect(() => {
    const getAll = async () => {
        await getFolder()
    }
    getAll();
  }, [openModal])

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
      const allFolders = await getFolder()
      setFolderList(allFolders)
    }
    getAll();
  }

  return <div>
    <div className="navbar-container">
      <div className="navbar-left">
        {/* <Link to='#' className='menu-bars'>
            <FaBars onClick={showSidebar} />
          </Link> */}
        <span className="navbar-logo"><Link to="/home">Canary</Link></span>
      </div>
      <div className="navbar-center">
        <div className="navbar-search">
          <FaSearch className="search" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-icons">
          <div className="navbar-IconItem">
            <Link to="/"><span className='project-text'>Project Name</span></Link>
          </div>
          <div className="navbar-IconItem">

            <Link to="/"><span className='project-text' >Save</span></Link>
          </div>
          <div className="navbar-IconItem">
            <Link to="/"><span className='project-text'>Share</span></Link>
          </div>

        </div>
      </div>

    </div>
    <div className="sidenav">
      <div className="sidenav-container">

        <ul className="sidenav-list">
          <li className="sidenav-item">
            <FaBackspace className="sidenav-project" />
            <Link to="/projects">
              <span className="sidenav-text">Back</span>
            </Link>
          </li>
          <li className="sidenav-item">
            <AiFillEdit className="sidenav-project" />
            <Link to="/home">
              <span className="sidenav-text">Editor</span>
            </Link>
          </li>
          <li className="sidenav-item">
            <RiTeamFill className="sidenav-project" />
            <Link to="/home">
              <span className="sidenav-text">Team</span>
            </Link>
          </li>
          <li className="sidenav-item">
            <RiChatSmile2Fill className="sidenav-project" />
            <Link to="/">
              <span className="sidenav-text">Chat</span>
            </Link>
          </li>
          <li className="sidenav-item">
            <FaHistory className="sidenav-project" />
            <Link to="/">
              <span className="sidenav-text">History</span>
            </Link>
          </li>

          <li className="sidenav-item">
            <GoGraph className="sidenav-project" />
            <Link to="/">
              <span className="sidenav-text">Satistics</span>
            </Link>
          </li>
          <li className="sidenav-item">
            <MdSettings className="sidenav-project" />
            <Link to="/">
              <span className="sidenav-text">Settings</span>
            </Link>
          </li>

        </ul>
      </div>

    </div>
    <div className="folder">
      {
        folderList.map(folder =>
          <div className="folders" key={folder.id}>
            <Link to={`/mainspace/${folder.id}`}> <BsImageFill className='folder-icon' /></Link>
            <div className="folder-info">
              <h3 className='folder-text'>{folder.name}</h3>
              <BsThreeDots className='three-dots' />
            </div>
          </div>
        )
      }

      {/* 
    </div>
    <div className="folder"> */}
      {/* <div className="folders">
        <Link to="/mainspace"><BsImageFill className='folder-icon' /></Link>
        <div className="folder-info">
          <h3 className='folder-text'>Folder 2</h3>
          <BsThreeDots className='three-dots' />
        </div>
      </div>
      <div className="folders">
        <Link to="/mainspace"> <BsImageFill className='folder-icon' /></Link>
        <div className="folder-info">
          <h3 className='folder-text'>Folder 3</h3>
          <BsThreeDots className='three-dots' />
        </div>
      </div> */}
      <div className="folders">
        <button className='add' onClick={() =>
          setOpenModal(true)}>+</button>
        <h3 className='folder-add'>Add new Folder</h3>

      </div>


    </div>
    {openModal && <Modal closeModal={setOpenModal} />}
  </div>;
}

export default Workspace;

