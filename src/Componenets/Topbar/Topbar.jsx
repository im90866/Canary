
import React,{useState} from 'react'
import "./Topbar.css"
import {FaSearch,FaHome} from 'react-icons/fa'
import {RiChatSmile2Fill} from  "react-icons/ri"
import {BsFillPlusCircleFill} from "react-icons/bs"
import { Link } from "react-router-dom";
import {FaBars} from 'react-icons/fa';

import { MdExplore,MdNotificationsActive,MdSettings} from "react-icons/md"
import {GoSignOut} from "react-icons/go"
import { IconContext } from 'react-icons';
function Topbar() {
    // const [sidebar,setSidebar]=useState(false);
    // const showSidebar=()=>setSidebar(!sidebar);
  return (
    <div>
     
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
          <Link to="/home"><FaHome /></Link>
          </div>
          <div className="navbar-IconItem">
          <Link to="/home"><RiChatSmile2Fill /></Link>
            <span className="navbar-Iconnumber">2</span>
          </div>
          <div className="navbar-IconItem">
          <Link to="/projects"><BsFillPlusCircleFill /></Link>
          </div>
          <div className="navbar-IconItem">
          <Link to="/home"><img src="/images/avatar.png" alt="" className="topbarImg"/></Link>
          </div>
          </div>
        </div>
      
      </div>
      {/* <nav className={sidebar ? 'nav-menu active':'nav-menu'}>
       <ul className='nav-menu-items' onClick={showSidebar}>
         <li className='navbar-toggle'>
           <Link to='/home' className='menu-bars'>
             <FaBars/>
           </Link>
         </li>   */}

    
         <div className="sidenav">
                <div className="sidenav-container">
            
                    <ul className="sidenav-list">
                        <li className="sidenav-item">
                        <MdExplore  className="sidenav-icon"/>
                        <Link to="/home">
                        <span className="sidenav-text">Explore</span> 
                            </Link>
                        </li>
                       <li className="sidenav-item">
                        <MdNotificationsActive className="sidenav-icon"/>
                        <Link to="/home">
                          <span className="sidenav-text">Notifications</span> 
                        </Link>
                        </li>
                      <li className="sidenav-item">
                        <MdSettings  className="sidenav-icon"/>
                        <Link to="/home">
                             <span className="sidenav-text">Settings</span> 
                            </Link>
                        </li>
                       <li className="sidenav-item">
                        <GoSignOut  className="sidenav-icon"/>
                        <Link to="/">
                             <span className="sidenav-text">LogOut</span> 
                        </Link>
                        </li>
                    </ul>
                </div> 
          
           </div>
        
          
      
       {/* </ul>
    
        </nav> */}
      </div>
  )
}

export default Topbar
