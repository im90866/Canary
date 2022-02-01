// import React, { Component } from "react";
// // import axios, { Axios } from 'axios'; 


// class Upload extends Component {
//     state = {
//         selectedFile: null
//     }
//     fileSelect = event => {
//         this.setState({
//             selectedFile: event.target.files[0]
//         })
//         console.log(event.target.files[0]);
//        }
//     fileUpload = () => {
//         const fd = new FormData();
//         fd.append('image',this.state.selectedFile, this.state.selectedFile.name);
//         // Axios.post('', fd);
//     }

//     render() {
//         return (
//             <div className="Upload">
//                 <input type="file" onChange={this.fileSelect}/>
//                 <button onClick={this.fileUpload}>Upload</button>
//             </div>
//         )
//     }
    
// }

// export default Upload;
    
import React from 'react';
import {FaSearch,FaHome} from 'react-icons/fa'

import { Link } from "react-router-dom";
import {FaBackspace,FaHistory } from 'react-icons/fa';

import { MdSettings,MdAddBox} from "react-icons/md"
import {GoGraph} from "react-icons/go"

import {AiFillEdit,AiFillFolderAdd } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import "./Workspace.css"
import {RiChatSmile2Fill} from  "react-icons/ri"
import { BsImageFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import Modal from "../Modal/Modal"
import {useState} from "react"

function Workspace() {
  const [openModal ,setOpenModal] =useState(false);
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
          <FaSearch className="search"/>
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
                        <FaBackspace className="sidenav-project"/>
                        <Link to="/projects">
                        <span className="sidenav-text">Back</span> 
                            </Link>
                        </li>
                       <li className="sidenav-item">
                        <AiFillEdit className="sidenav-project"/>
                        <Link to="/home">
                          <span className="sidenav-text">Editor</span> 
                        </Link>
                        </li>
                      <li className="sidenav-item">
                        <RiTeamFill className="sidenav-project"/>
                        <Link to="/home">
                             <span className="sidenav-text">Team</span> 
                            </Link>
                        </li>
                       <li className="sidenav-item">
                        <RiChatSmile2Fill  className="sidenav-project"/>
                        <Link to="/">
                             <span className="sidenav-text">Chat</span> 
                        </Link>
                        </li>
                        <li className="sidenav-item">
                        <FaHistory  className="sidenav-project"/>
                        <Link to="/">
                             <span className="sidenav-text">History</span> 
                        </Link>
                        </li>

                        <li className="sidenav-item">
                        <GoGraph  className="sidenav-project"/>
                        <Link to="/">
                             <span className="sidenav-text">Satistics</span> 
                        </Link>
                        </li>
                        <li className="sidenav-item">
                        <MdSettings  className="sidenav-project"/>
                        <Link to="/">
                             <span className="sidenav-text">Settings</span> 
                        </Link>
                        </li> 
                    
                     </ul>
                </div> 
          
           </div>    
        <div className="folder">
        <div className="folders">
       <Link to="/mainspace"> <BsImageFill className='folder-icon'/></Link>
       <div className="folder-info">
        <h3 className='folder-text'>Folder 1</h3>
        <BsThreeDots className='three-dots'/>
        </div> 
        </div>
        <div className="folders">
        <Link to="/mainspace"><BsImageFill className='folder-icon'/></Link> 
        <div className="folder-info">
        <h3 className='folder-text'>Folder 2</h3>
        <BsThreeDots className='three-dots'/>
        </div>
        </div>
        <div className="folders">
        <Link to="/mainspace"> <BsImageFill className='folder-icon'/></Link> 
        <div className="folder-info">
        <h3 className='folder-text'>Folder 3</h3>
        <BsThreeDots className='three-dots'/>
        </div>
        </div>
        <div className="folders">
       <button className='add' onClick={()=>
      setOpenModal(true)}>+</button>
        <h3 className='folder-add'>Add new Folder</h3>
       
        </div>
        

        </div>
        {openModal && <Modal closeModal={setOpenModal}/>}
  </div>;
}

export default Workspace;