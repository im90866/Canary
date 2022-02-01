import React from 'react';
import {FaSearch,FaHome} from 'react-icons/fa'

import { Link } from "react-router-dom";
import {FaBackspace,FaHistory } from 'react-icons/fa';

import { MdSettings,MdAddBox} from "react-icons/md"
import {GoGraph} from "react-icons/go"

import {AiFillEdit,AiFillFolderAdd } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";

import {RiChatSmile2Fill} from  "react-icons/ri"
import { BsImageFill } from "react-icons/bs";
import Upload from '../Upload/Upload';
function Mainspace() {
  return (<div>
{/* <div className="navbar-container">
        <div className="navbar-left">
        {/* <Link to='#' className='menu-bars'>
            <FaBars onClick={showSidebar} />
          </Link> */}
         {/* <span className="navbar-logo"><Link to="/home">Canary</Link></span>
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
                      
                    </ul> */}
                {/* </div> 
                </div>   */} 

<div className="upload-container">
    <Upload/>
</div>
  </div>
  );
}

export default Mainspace;
