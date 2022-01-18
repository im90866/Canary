import React from 'react'
import { MdExplore,MdNotificationsActive,MdSettings} from "react-icons/md"
import {GoSignOut} from "react-icons/go"
import  "./Sidebar.css"
import { Link } from "react-router-dom";
import "../Home/Home.css"
function Sidebar() {
    return (
        <div>
            <div className="sidenav">
                <div className="sidenav-container">
                    <ul className="sidenav-list">
                        <li className="sidenav-item">
                        <MdExplore  className="sidenav-icon"/>
                        <Link to="/home"><span className="sidenav-text">Explore</span></Link>
                        </li>
                       <li className="sidenav-item">
                        <MdNotificationsActive className="sidenav-icon"/>
                        <Link to="/home"><span className="sidenav-text">Notifications</span></Link>
                        </li>
                      <li className="sidenav-item">
                        <MdSettings  className="sidenav-icon"/>
                        <Link to="/home"><span className="sidenav-text">Settings</span></Link>
                        </li>
                       <li className="sidenav-item">
                        <GoSignOut  className="sidenav-icon"/>
                        <Link to="/"><span className="sidenav-text">Sign Out</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
           
         

        </div>
    )
}

export default Sidebar
