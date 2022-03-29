import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

import { RiChatSmile2Line } from "react-icons/ri"
import { NavLink, Link, useParams} from "react-router-dom";
import { MdOutlineExplore ,MdOutlineSummarize} from "react-icons/md"
import { AiOutlineHome} from 'react-icons/ai';
import { IoCreateOutline, IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import { useContext, useEffect,useState} from "react";

import { isMobileContext } from '../Topbar/Topbar'

export default function Sidebar(prop) {
  let navigate = useNavigate()

  const cache = prop.cache
  const setCache = prop.setCache

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
  }

  const goTo = (loc) => {
    navigate(loc)
  }

  useEffect(() => {
    
  }, [])


  return (
    <>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className={active['home']} onClick={() => goTo('/home')}>
                <AiOutlineHome className="sidebarIcon" />
                <span className="sidebarListItemText">Home</span>
              
            </li>

            <li className="sidebarListItem" onClick={() => goTo('/project')}>
                <IoCreateOutline className="sidebarIcon" />
                <span className="sidebarListItemText">Project</span>
            </li>

            <li className="sidebarListItem" onClick={() => goTo('/chats')}>
                <RiChatSmile2Line className="sidebarIcon" />
                <span className="sidebarListItemText">Chats</span>
            </li>

            <li className="sidebarListItem" onClick={() => goTo('/settings')}>
                <IoSettingsOutline className="sidebarIcon" />
                <span className="sidebarListItemText">Settings</span>
            </li>
            <li className="sidebarListItem">
              <NavLink to="/summary">
                <MdOutlineSummarize className="sidebarIcon" />
                <span className="sidebarListItemText">Report</span>
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