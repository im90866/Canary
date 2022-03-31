import React, { useState, useEffect} from 'react'

import { RiChatSmile2Line } from "react-icons/ri"

import { NavLink, Link, useNavigate} from "react-router-dom";


import { MdOutlineExplore, MdWorkspacesOutline,MdOutlineSummarize } from "react-icons/md"
import { BsChatSquareDots } from 'react-icons/bs';
import { AiOutlineHome, AiFillCaretDown, AiOutlineTeam, AiFillCaretUp } from 'react-icons/ai';
import { IoCreateOutline, IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import "./Sidebar2.css"

function Sidebar2(prop) {
  let navigate = useNavigate()

  const cache = prop.cache
  const setCache = prop.setCache
  const showSidebar = prop.showSidebar
  const setShowSidebar = prop.setShowSidebar

  const [projectId, setProjectId] = useState()
  const [sub, setSub] = useState(false)

  const [active, setActive] = useState({
    'home': "sidebarListItem",
    'project': "sidebarListItem",
    'chats': "sidebarListItem",
    'settings': "sidebarListItem"
  })

  const logout = () => {
    eraseCookie('username')
    eraseCookie('userID')
    setCache({})
    navigate('/')
    window.location.reload();
    window.location.reload();
  }

  const goTo = (loc) => {
    navigate(loc)
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
  }, [showSidebar])

  return (
    <div className="sidebar2" onClick={e => e.stopPropagation()}>
      <div className="sidebarWrapper">
        <ul className="sidebarList">

            <li className={active['home']} onClick={() => {goTo('/home'); if(showSidebar) setShowSidebar(false)}}>
              <AiOutlineHome className="sidebarIcon" />
              <span className="sidebarListItemText">Home</span>
            </li>

            <li className="sidebarListItem" onClick={() => {goTo('/project'); if(showSidebar) setShowSidebar(false)}}>
              <IoCreateOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Project</span>
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
                    <Link to={"/"+ window.sessionStorage.getItem("currentProjectId") +"/workspace/"} onClick={() => {if(showSidebar) setShowSidebar(false)}}>
                      <span className="sidebarListItemTextsub1">Workspace</span>
                    </Link>
                  </li>
                  <li className="sidebarListItemsub">
                    <Link to={"/" + window.sessionStorage.getItem("currentProjectId") +"/projectmembers"} onClick={() => {if(showSidebar) setShowSidebar(false)}}>
                      <span className="sidebarListItemTextsub2">Members</span>
                    </Link>
                  </li>
                  <li className="sidebarListItemsub">
                    <Link to={"/" + window.sessionStorage.getItem("currentProjectId") +"/teamchats"} onClick={() => {if(showSidebar) setShowSidebar(false)}}>

                      <span className="sidebarListItemTextsub3">Team Chat</span>
                    </Link>
                  </li>
                  <li className="sidebarListItemsub">
                    <Link to={"/" + window.sessionStorage.getItem("currentProjectId") +"/projectsettings"} onClick={() => {if(showSidebar) setShowSidebar(false)}}>
                      <span className="sidebarListItemTextsub4">Project Settings</span>
                    </Link>
                  </li>
                </ul>
                :
                null
            }
          </li>

          <li className="sidebarListItem" onClick={() => {goTo('/chats'); if(showSidebar) setShowSidebar(false)}}>
                <RiChatSmile2Line className="sidebarIcon" />
                <span className="sidebarListItemText">Chats</span>
          </li>

          <li className="sidebarListItem" onClick={() => {goTo('/settings'); if(showSidebar) setShowSidebar(false)}}>
                <IoSettingsOutline className="sidebarIcon" />
                <span className="sidebarListItemText">Settings</span>
          </li>

          <li className="sidebarListItem" onClick={() => {goTo('/summary'); if(showSidebar) setShowSidebar(false)}}>
              <MdOutlineSummarize className="sidebarIcon" />
              <span className="sidebarListItemText">Summary</span>
          </li>
          
          <li className="sidebarListItem">
            <Link to="/">
              < IoLogOutOutline className="sidebarIcon" onClick={() => logout()}/>
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