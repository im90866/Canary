import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

import { RiChatSmile2Line } from "react-icons/ri"
import { NavLink, Link } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md"
import { AiOutlineHome,AiFillHome } from 'react-icons/ai';
import { IoCreateOutline, IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import { useContext } from "react";

import { isMobileContext } from '../Topbar/Topbar'

export default function Sidebar(prop) {
  let navigate = useNavigate()

  const cache = prop.cache
  const setCache = prop.setCache

  const logout = () => {
    eraseCookie('username')
    eraseCookie('userID')
    setCache({})
    navigate('/')
  }


  return (
    <>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <NavLink to="/home"AiFillHome>
                <AiOutlineHome className="sidebarIcon" />
                <span className="sidebarListItemText">Home</span>
              </NavLink>
            </li>

            <li className="sidebarListItem">
              <NavLink to="/project">
                <IoCreateOutline className="sidebarIcon" />
                <span className="sidebarListItemText">Project</span>
              </NavLink>
            </li>

            <li className="sidebarListItem">
              <NavLink to="/chats">
                <RiChatSmile2Line className="sidebarIcon" />
                <span className="sidebarListItemText">Chats</span>
              </NavLink>
            </li>



            <li className="sidebarListItem">
              <NavLink to="/settings">
                <IoSettingsOutline className="sidebarIcon" />
                <span className="sidebarListItemText">Settings</span>
              </NavLink>
            </li>

            <li className="sidebarListItem" onClick={() => logout()}>
              <NavLink to="/">
                <IoLogOutOutline className="sidebarIcon" />
                <span className="sidebarListItemText">Signout</span>
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </>
  );
}

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}