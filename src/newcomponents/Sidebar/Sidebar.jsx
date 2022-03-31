import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

import { RiChatSmile2Line } from "react-icons/ri"
import { NavLink, Link, useParams} from "react-router-dom";
import { MdOutlineExplore ,MdOutlineSummarize} from "react-icons/md"
import { AiOutlineHome} from 'react-icons/ai';
import { IoCreateOutline, IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import { useContext, useEffect,useState} from "react";

import axios from 'axios'
import { isMobileContext } from '../Topbar/Topbar'

export default function Sidebar(prop) {
  let navigate = useNavigate()

  const cache = prop.cache
  const setCache = prop.setCache
  const showSidebar = prop.showSidebar
  const setShowSidebar = prop.setShowSidebar

  console.log("sidebar" + prop.showSidebar)
  
  const [isAdmin, setIsAdmin] = useState("")

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

  useEffect(() => {
    axios.get("http://localhost:8000/isAdmin/" + getCookie('userID'))
      .then((res) => {
        console.log(res.data['isAdmin'])
        setIsAdmin(res.data['isAdmin'])
      })
  }, [showSidebar])


  return (
    <>
      <div className="sidebar" onClick={e => e.stopPropagation()}>
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

            <li className="sidebarListItem" onClick={() => {goTo('/chats'); if(showSidebar) setShowSidebar(false)}}>
                <RiChatSmile2Line className="sidebarIcon" />
                <span className="sidebarListItemText">Chats</span>
            </li>

            <li className="sidebarListItem" onClick={() => {goTo('/settings'); ; if(showSidebar) setShowSidebar(false)}}>
                <IoSettingsOutline className="sidebarIcon" />
                <span className="sidebarListItemText">Settings</span>
            </li>

            {
              isAdmin && 
              <li className="sidebarListItem" onClick={() => {goTo('/summary'); if(showSidebar) setShowSidebar(false)}}>
                <MdOutlineSummarize className="sidebarIcon" />
                <span className="sidebarListItemText">Summary</span>
            </li>
            }
            
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

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}