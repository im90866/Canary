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
import Modal5 from '../Modal5/Modal5';
import Modal5_1 from '../Modal5/Modal5_1';

function Workspace(props) {
  const fileRef = useRef();

  const [openDropdown, setOpenDropdown] = useState(false);

  const projectId = useParams()['id']
  const [folders, setFolders] = useState([])
  const [images, setImages] = useState([])
  const [folderPath, setFolderPath] = useState(["root"])
  const [changed, makeChange] = useState(false)

  const [editableName, setEditable] = useState("6222fcdd899bcbbc39df3d38")

  const [openModal, setOpenModal] = useState(false)
  const [openModalRename, setOpenModalRename] = useState(false)
  const [modalVal, setModalVal] = useState("")
  const [folderId, setFolderId] = useState("")
  const [imageId, setImdageId] = useState("")

  const RenameModalStatus = () =>{
    if(folderId !== null){
      setFolderId("")
      setOpenModalRename(false)
    }
    else{
      setImdageId("")
      setOpenModalRename(false)
    }
  }

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
    //await axios.post("http://localhost:8000/postImage/", req).then((res) => {
    //  console.log(res)
    //})

  }

  const getFolders = async () => {
    await axios.get("http://localhost:8000/getFolder/" + projectId + '/' + folderPath.join('&'))
      .then((res) => {
        if (res.data["success"]) {
          console.log(res.data['folderList'])
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

  const deleteFolder = async (folderID) => {
    const request = {
      'folderID': folderID,
      'projectID': projectId,
      'folderPath': folderPath
    }

    await axios.post("http://localhost:8000/deleteFolder/", request).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
    })
  }

  const deleteImage = async (imageID) => {
    const request = {
      'imageID': imageID,
      'projectID': projectId,
      'folderPath': folderPath
    }

    await axios.post("http://localhost:8000/deleteImage/", request).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
    })
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
                <div className="folders" key={folder.folderID} >
                  <BsFillFolderFill className='folder-icon' onClick={() => enterFolder(folder.folderID)}/>
                  <div className="folder-info"> {folder.folderName}
                    <div class="dropdown-block">
                      <BsThreeDots className='three-dots' class="dropdowns" />
                      <div class="dropdown-content">
                        <button class="dropdown-text" onClick={() => {setOpenModalRename(true);setModalVal("Rename");setFolderId(folder.folderID)}}>Rename</button>
                        <button class="dropdown-text" onClick={() => deleteFolder(folder.folderID)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            {
              images.map(image =>
                <div >
                  <img className="image" src={image.imageVal} width={100} height={100} onClick={() => postImage(image.imageID)} />
                  <div className="folder-info">
                    <h3 className='folder-text'>{image.fileName}</h3>
                    <div className="dropdown-block">
                      <BsThreeDots className='three-dots' class="dropdowns" />
                      <div class="dropdown-content">
                        <button className="dropdown-text" onClick={() => setOpenModal(true)}>Post</button>
                        <button className="dropdown-text" onClick={() => {setOpenModalRename(true);setModalVal("Rename");setImdageId(image.imageID)}}>Rename</button>
                        <button className="dropdown-text" onClick={() => deleteImage(image.imageID)}>Delete</button>
                        <button className="dropdown-text">Download</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </body>
      {openModal && <Modal5 closeModal={setOpenModal} makeChange={makeChange} />}
      {openModalRename && <Modal5_1 closeModal={RenameModalStatus} makeChange={makeChange} name={modalVal} folderId={folderId} imageId={imageId}/>}
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