import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

import {RiChatSmile2Line} from  "react-icons/ri"
import { NavLink ,Link} from "react-router-dom";
import { MdOutlineExplore} from "react-icons/md"
import  {AiOutlineHome}from 'react-icons/ai';
import {IoCreateOutline,IoSettingsOutline,IoLogOutOutline} from   'react-icons/io5';

export default function Sidebar() {
  let navigate = useNavigate()

  const logout = () => {
    eraseCookie('username')
    eraseCookie('userID')
    navigate('/')
  }

  console.log(window.innerWidth)

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
            <Link to="/chats"> 
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

          <li className="sidebarListItem" onClick={() => logout()}>
            <Link to="/"> 
              <IoLogOutOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Signout</span>
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
}

function eraseCookie(name) {   
  document.cookie = name+'=; Max-Age=-99999999;';  
}