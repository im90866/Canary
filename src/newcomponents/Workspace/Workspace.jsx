import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Sidebar2 from '../Sidebar2/Sidebar2'
import Topbar from '../Topbar/Topbar'
import "./Workspace.css"
import { AiFillFolderOpen } from "react-icons/ai";

import { BsThreeDots } from "react-icons/bs";

import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import Dropdown from '../Dropdown/Dropdown';
import Modal5 from '../Modal5/Modal5';
import Modal5_1 from '../Modal5/Modal5_1';

import { BiArrowBack } from "react-icons/bi";
import { FaPython } from 'react-icons/fa'
import Modal14 from '../Modal14/Modal14'
import { show } from 'react-modal/lib/helpers/ariaAppHider'

function Workspace(prop) {
  const cache = prop.cache
  const setCache = prop.setCache

  const fileRef = useRef();

  const [openDropdown, setOpenDropdown] = useState(false);

  const projectId = useParams()['id']
  const [folders, setFolders] = useState([])
  const [images, setImages] = useState([])

  const [folderPath, setFolderPath] = useState(["root"])
  const [folderPathName, setFolderPathName] = useState(["root"])
  const [folderPathString, setFolderPathString] = useState("\\root")

  const [changed, makeChange] = useState(false)

  const [postImageVal, setPostImageVal] = useState("")

  const [imageToOpen, setImageToOpen] = useState("")

  const [openModal, setOpenModal] = useState(false)

  const [openModal3, setOpenModal3] = useState(false)
  const [openModalRename, setOpenModalRename] = useState(false)
  const [modalVal, setModalVal] = useState("")
  const [folderId, setFolderId] = useState("")
  const [imageId, setImageId] = useState("")
  const MAX_LENGTH = 15;

  const [showImg, setShowImg] = useState({
    image: '',
    state: false
  })
  const [showFolder, setShowFolder] = useState({
    folder: '',
    state: false
  })

  const RenameModalStatus = () => {
    if (folderId !== null) {
      setFolderId("")
      setOpenModalRename(false)
    }
    else {
      setImageId("")
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
    console.log(file['type'] == 'image/jpeg')
    console.log(file['type'])
    if (file['type'] == 'image/jpeg' || file['type'] == 'image/png') {
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
      console.log(req)
      await axios.post('http://localhost:8000/uploadImageWorkspace/', req).then((res) => {
        console.log(res)
        if (res.data['success']) {
          const val = {
            'projectID': projectId,
            'imageID': res.data['imageID'],
            'imageVal': image64,
            'uploadedTime': file['lastModifiedDate'],
            'uploader': String(getCookie('username')),
            'fileType': file['type'],
            'fileName': file['name'],
            'fileSize': file['size'],
          }
          let newImageList = images.slice()
          newImageList.unshift(val)
          setImages(newImageList)
        }
      });
    }

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

  const openImage = async (imageID) => {
    const req = {
      'metadataID': imageID,
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
          console.log(res.data['imageList'])

          setFolderPathString('\\' + folderPathName.join('\\'))
        }
        else
          console.log("Error: " + res.data["error"])
      })
  }

  const enterFolder = (folderID, folderName) => {
    let newPath = folderPath.slice()
    let newPathName = folderPathName.slice()

    console.log(folderName + newPathName)

    newPath.push(folderID)
    newPathName.push(folderName)

    console.log(newPathName)

    setFolderPath(newPath)
    setFolderPathName(newPathName)
  }

  const exitFolder = async () => {
    if (!(folderPath.length == 1)) {
      let newPath = folderPath.slice()
      let newPathName = folderPathName.slice()

      newPath.pop()
      newPathName.pop()

      setFolderPath(newPath)
      setFolderPathName(newPathName)
    }
  }

  const back = async () => {
    console.log("hello")
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
      else {
        let newFolders = folders.slice()

        for (let x = 0; x < folders.length; ++x) {
          console.log((folders[x])['folderID'] + " " + folderID)
          if ((folders[x])['folderID'] == folderID) {
            newFolders.splice(x, 1)
            break
          }
        }

        setFolders(newFolders)
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
      else {
        let newImageList = images.slice()
        for (let x = 0; x < images.length; ++x) {
          console.log((images[x])['imageID'] + " " + imageID)
          if ((images[x])['imageID'] == imageID) {
            newImageList.splice(x, 1)
            break
          }
        }

        setImages(newImageList)
      }
    })
  }

  const getProjectName = async () => {
    await axios.get("http://localhost:8000/getProjectName/" + projectId).then((res) => {
      window.sessionStorage.setItem("currentProjectName", res.data['projectName']);
      window.sessionStorage.setItem("currentProjectId", projectId);
    })
  }

  const nameHandler = (name) => {
    if (name.length > 15)
      return name.slice(0, 15) + '...'
    else return name
  }

  useEffect(() => {
    console.log(folderPath)
    getProjectName()

    makeChange(false)
    const getAll = async () => {
      await getFolders()
    }
    getAll();

    document.addEventListener('click', (e) => {
      if (showFolder.state)
        setShowFolder(showFolder.state = false)
      if (showImg.state)
        setShowImg(showImg.state = false)
      if (openDropdown)
        setOpenDropdown(false)
      if (openModal3)
        setOpenModal3(false)
      if (openModalRename)
        setOpenModalRename(false)
      if (openModal)
        setOpenModal(false)
    })

    if (openDropdown || openModal3 || openModalRename || openModal) {
    } else {
      document.getElementById('workspace-body').style.filter = 'blur(0px) grayscale(0%)'
    }

  }, [folderPath, showImg, showFolder, openDropdown, openModal3, openModalRename, openModal, images, folders])

  return (
    <div>
      <body className='workspace-body' id='workspace-body'>
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
                <button className="wbtn1"
                  onClick={(e) => {
                    setOpenDropdown(true);
                    e.stopPropagation();
                  }
                  }>
                  <span className='btn-text'>New Folder</span>
                </button>
              </div>
              {
                folderPath.length == 1 ?
                  <div className="directory-path">
                    <div className="inactive-whitespace" onClick={exitFolder}>
                      <BiArrowBack className='inactive-back' />
                    </div>
                    <h3 className="directory">{folderPathString}</h3>
                  </div>
                  :
                  <div className="directory-path">
                    <div className="whitespace" onClick={exitFolder}>
                      <BiArrowBack className='back' />
                    </div>
                    <h3 className="directory">{folderPathString}</h3>
                  </div>
              }
            </div>
          </div>
        </div>


        <div className="workspace-container2">
          <div className="folder">
            {
              folders.map((folder) =>
                <div className="folders" key={folder.folderID} >
                  <AiFillFolderOpen
                    id='folder-icon'
                    className='folder-icon'
                    onClick={!openModal3 && !openDropdown ? () => enterFolder(folder.folderID, folder.folderName) : null}
                  />
                  <div className="folder-info">
                    <h3 className='folder-text'>{nameHandler(folder.folderName)}</h3>
                    <div class="dropdown-block">
                      <BsThreeDots
                        className='three-dots'
                        class="dropdowns"
                        onClick={
                          (e) => {
                            setShowFolder({
                              folder: folder.folderID,
                              state: !showFolder.state
                            });
                            e.stopPropagation()
                            if (showImg.state)
                              setShowImg(showImg.state = false)
                          }
                        }
                      />
                      {
                        showFolder.folder === folder.folderID && showFolder.state
                          ?
                          <div class="dropdown-content">
                            <button
                              class="dropdown-text"
                              onClick={(e) => {
                                setOpenModalRename(true);
                                setModalVal("Rename");
                                setFolderId(folder.folderID);
                                e.stopPropagation()
                                setShowFolder(showFolder.state = false)

                              }}>
                              Rename
                            </button>
                            <button
                              class="dropdown-text"
                              onClick={() =>
                                deleteFolder(folder.folderID)
                              }>Delete
                            </button>
                          </div>
                          :
                          null
                      }
                    </div>
                  </div>
                </div>
              )
            }

            {
              images.map(image =>
                <div >
                  <div className="shadowbox">
                    <div className="image-cropper">
                      <img className="image" src={image.imageVal} width={100} height={100}
                        onClick={!openModal3 && !openDropdown ? (e) => {
                          setImageToOpen(image.imageVal)
                          setOpenModal3(true);
                          e.stopPropagation();
                        }
                          :
                          null
                        }
                      />
                      {/* onClick={() => openImage(image.imageID)} */}
                    </div>
                  </div>
                  <div className="folder-info">
                    <h3 className='folder-text1'>{nameHandler(image.fileName)}</h3>
                    <div className="dropdown-block">
                      <BsThreeDots
                        className='three-dots3'
                        class="dropdowns"
                        onClick={
                          (e) => {
                            setShowImg({ image: image.imageID, state: !showImg.state });
                            e.stopPropagation()
                            if (showFolder.state)
                              setShowFolder(showFolder.state = false)
                          }
                        }
                      />

                      {
                        showImg.image === image.imageID && showImg.state
                          ?
                          <div class="dropdown-content" id='dropdown-content'>
                            <button
                              className="dropdown-text"
                              onClick={(e) => {
                                setImageId(image.imageID);
                                setPostImageVal(image);
                                setOpenModal(true);
                                e.stopPropagation();
                                setShowImg(showImg.state = false)
                              }}>
                              Post
                            </button>
                            <button
                              className="dropdown-text"
                              onClick={(e) => {
                                setImageId(image.imageID);
                                setOpenModalRename(true);
                                setModalVal("Rename");
                                e.stopPropagation();
                                setShowImg(showImg.state = false)
                              }}>
                              Rename
                            </button>
                            <button
                              className="dropdown-text"
                              onClick={() =>
                                deleteImage(image.imageID)
                              }>
                              Delete
                            </button>
                            <a className="dropdown-text1" href={image.imageVal} download>Download</a>
                          </div>
                          :
                          null
                      }

                    </div>
                  </div>
                </div>
              )
            }
          </div>

        </div>
      </body>
      {openModal3 && <Modal14 imageVal={imageToOpen} closeModal={setOpenModal3} />}

      {openDropdown && <Dropdown closeModal={setOpenDropdown}
        path={folderPath}
        projId={projectId}
        folders={folders}
        setFolder={setFolders}
      />}

      {openModal && <Modal5 projectID={projectId} image={postImageVal} closeModal={setOpenModal} makeChange={makeChange} />}
      {openModalRename &&
        <Modal5_1
          closeModal={setOpenModalRename}
          folderList={folders}
          imageList={images}
          setFolders={setFolders}
          setImages={setImages}
          name={modalVal}
          folderId={folderId}
          imageId={imageId}
        />}

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