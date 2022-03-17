import React, { useState } from 'react'

import { RiChatSmile2Line } from "react-icons/ri"

import { NavLink, Link } from "react-router-dom";


import { MdOutlineExplore, MdWorkspacesOutline } from "react-icons/md"


import { BsChatSquareDots } from 'react-icons/bs';
import { AiOutlineHome, AiFillCaretDown, AiOutlineTeam, AiFillCaretUp } from 'react-icons/ai';
import { IoCreateOutline, IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import "./Sidebar2.css"
function Sidebar2() {

  const [sub, setSub] = useState(false)

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
          <li className="sidebarListItem" onClick={() => setSub(!sub)}>

            <span className="sidebarListItemText1">Project1</span>
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
                    <Link to="/workspace/:id">

                      <span className="sidebarListItemTextsub">Workspace</span>
                    </Link>
                  </li>
                  <li className="sidebarListItemsub">
                    <Link to="/projectsettings">

                      <span className="sidebarListItemTextsub">Teams</span>
                    </Link>
                  </li>
                  <li className="sidebarListItemsub">
                    <Link to="/teamchats">

                      <span className="sidebarListItemTextsub">Team chats</span>
                    </Link>
                  </li>
                  <li className="sidebarListItemsub">
                    <Link to="/team">

                      <span className="sidebarListItemTextsub">Project Settings</span>
                    </Link>
                  </li>
                </ul>
                :
                null
            }
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