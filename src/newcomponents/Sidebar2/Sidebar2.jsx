import React, { useState, useEffect} from 'react'

import { RiChatSmile2Line } from "react-icons/ri"

import { NavLink, Link, useNavigate} from "react-router-dom";


import { MdOutlineExplore, MdWorkspacesOutline } from "react-icons/md"
import { BsChatSquareDots } from 'react-icons/bs';
import { AiOutlineHome, AiFillCaretDown, AiOutlineTeam, AiFillCaretUp } from 'react-icons/ai';
import { IoCreateOutline, IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import "./Sidebar2.css"

function Sidebar2(prop) {
  let navigate = useNavigate()

  const cache = prop.cache
  const setCache = prop.setCache

  const [projectId, setProjectId] = useState()
  const [sub, setSub] = useState(false)

  const logout = () => {
    eraseCookie('username')
    eraseCookie('userID')
    setCache({})
    navigate('/')
  }

  const getName = () => {
    let name = window.sessionStorage.getItem("currentProjectName")
    
    if(name.length > 13)
      return name.slice(0, 13) + '...'
    else
      return name
  }

  useEffect(() => {
    window.sessionStorage.getItem("currentProjectName")
    window.sessionStorage.getItem("currentProjectId")
  }, [])

  return (
    <div className="sidebar2">
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

          <li className="sidebarListItem" onClick={() => setSub(!sub)}>

            <span className="sidebarListItemText1">{getName()}</span>
            {
              sub
                ?
                <AiFillCaretUp className="sidebarIcon1" />
                :
                <AiFillCaretDown className="sidebarIcon1" />
            }

            {
              sub
                ?
                <ul className="sidebarlistsub">
                  <li className="sidebarListItemsub">
                    <Link to={"/"+ window.sessionStorage.getItem("currentProjectId") +"/workspace/"}>
                      <span className="sidebarListItemTextsub1">Workspace</span>
                    </Link>
                  </li>
                  <li className="sidebarListItemsub">
                    <Link to={"/" + window.sessionStorage.getItem("currentProjectId") +"/projectmembers"}>
                      <span className="sidebarListItemTextsub2">Members</span>
                    </Link>
                  </li>
                  <li className="sidebarListItemsub">
                    <Link to={"/" + window.sessionStorage.getItem("currentProjectId") +"/teamchats"}>

                      <span className="sidebarListItemTextsub3">Team Chat</span>
                    </Link>
                  </li>
                  <li className="sidebarListItemsub">
                    <Link to={"/" + window.sessionStorage.getItem("currentProjectId") +"/projectsettings"}>
                      <span className="sidebarListItemTextsub4">Project Settings</span>
                    </Link>
                  </li>
                </ul>
                :
                null
            }
          </li>

          <li className="sidebarListItem">
            <Link to="/">
              <RiChatSmile2Line className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
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

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

export default Sidebar2