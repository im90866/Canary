import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import "./Workspace.css"
import { BsFillFolderFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";

import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react"
import axios from "axios"

import Dropdown from '../Dropdown/Dropdown';

function Workspace(props) {
  const fileRef = useRef();

  const [openDropdown, setOpenDropdown] = useState(false);

  const projectId = useParams()['id']
  const [folders, setFolders] = useState([])
  const [images, setImages] = useState([])
  const [folderPath, setFolderPath] = useState(["root"])
  const [changed, makeChange] = useState(false)

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

    const req = {
      'projectID': projectId,
      'currentPath': folderPath,

      'imageString': image64,

      'fileName': file['name'],
      'uploadedTime': file['lastModifiedDate'],
      'uploader': String(getCookie('username')),
      'fileSize': file['size'],
      'fileType': file['type'],
    }

    console.log(image64)
    axios.post('http://localhost:8000/uploadImageWorkspace/', req).then((res) => {
      console.log(res)
    });
    makeChange(true)
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

  const postImage = async (imageID) => {
    const req = {
      'projectID': projectId,
      'metadataID': imageID,
      "uploader": String(getCookie('username')),
    }

    console.log("HOOOHHAAA")
    await axios.post("http://localhost:8000/postImage/", req).then((res) => {
      console.log(res)
    })

  }

  const getFolders = async () => {
    await axios.get("http://localhost:8000/getWorkspace/" + projectId + '/' + folderPath.join('&'))
      .then((res) => {
        if (res.data["success"]) {
          console.log(res.data['imageList'])
          setFolders(res.data['folderList'])
          setImages(res.data['imageList'])
        }
        else
          console.log("Error: " + res.data["error"])
      })
  }

  const enterFolder = (folderID) => {
    folderPath.push(folderID)
    setFolderPath(folderPath)
    console.log(folderPath)
    makeChange(true)
  }

  useEffect(() => {
    makeChange(false)
    const getAll = async () => {
      await getFolders()
    }
    getAll();
  }, [openDropdown, changed, folderPath])

  return (
    <div>
      <Topbar />
      <Sidebar />
      <body className='workspace-body'>
      <div className="workspace-container">
        <div className="workspace">
           <div className="workspace-title">
            <h1 className="wtitle">WorkSpace</h1>
            <div className="btn-grp">
              <button className="wbtn" onClick={() => fileRef.current.click()}>Upload</button>
              <input
                ref={fileRef}
                onChange={fileSelect}
                multiple={false}
                type="file"
                hidden
              />
              <button className="wbtn1" onClick={() =>
                setOpenDropdown(true)}><span className='btn-text'>New Folder</span></button>
            </div>
          </div>
        </div>

      </div>

      {openDropdown && <Dropdown closeModal={setOpenDropdown}
        path={folderPath}
        projId={projectId}
        setFolder={setFolders}
        makeChange={makeChange} />}

       <div className="workspace-container2">
        <div className="folder">
          {
            folders.map(folder =>
              <div className="folders" key={folder.folderID} onClick={() => enterFolder(folder.folderID)}>
                <BsFillFolderFill className='folder-icon' />
                <div className="folder-info">
                  <h3 className='folder-text'>{folder.folderName}</h3>
                  <BsThreeDots className='three-dots' />
                </div>
              </div>
            )
          }

          {
            images.map(image =>
              <div >
                <img className="image" src={image.imageVal} width={100} height={100} onClick={() => postImage(image.imageID)} />
                <div className="folder-info">
                  <h3 className='folder-text'></h3>
                  <BsThreeDots className='three-dotsimg' />
                </div>
              </div>
            )
          }
        </div>
      </div> 
      </body>
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

export default Workspace