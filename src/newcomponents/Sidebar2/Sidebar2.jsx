import React from 'react'

import {RiChatSmile2Line} from  "react-icons/ri"

import { NavLink ,Link} from "react-router-dom";


import { MdOutlineExplore} from "react-icons/md"


import  {AiOutlineHome}from 'react-icons/ai';
import {IoCreateOutline,IoSettingsOutline,IoLogOutOutline} from   'react-icons/io5';
function Sidebar2() {
  return (
    <div className="sidebar">
    <div className="sidebarWrapper">
      <ul className="sidebarList">
      
        <li className="sidebarListItem">
        <NavLink to="/home" activeStyle={{ backgroundColor: '#88e' }}>
          <AiOutlineHome className="sidebarIcon" />
          <span className="sidebarListItemText">Home</span>
        </NavLink>
        </li>
    
    
        <li className="sidebarListItem">
        <Link to="/project">
        <IoCreateOutline className="sidebarIcon" />
          <span className="sidebarListItemText">Project</span>
          </Link>
        </li>
    
        <li className="sidebarListItem">
        <Link to="/"> 
          <RiChatSmile2Line className="sidebarIcon" />
          <span className="sidebarListItemText">Chats</span>
          </Link>
        </li>  
       <li className="sidebarListItem">
       <Link to="/">
          <MdOutlineExplore className="sidebarIcon" />
          <span className="sidebarListItemText">Explore</span>
          </Link>
        </li> 
        
        <li className="sidebarListItem">
        <Link to="/settings"> 
          <IoSettingsOutline className="sidebarIcon" />
          <span className="sidebarListItemText">Settings</span>
          </Link>
        </li> 
    <li className="sidebarListItem">
    <Link to="/"> 
          < IoLogOutOutline className="sidebarIcon" />
          <span className="sidebarListItemText">Signout</span>
          </Link>
        </li>
       
      </ul>
     
   
    </div>
  </div>
  )
}

export default Sidebar2