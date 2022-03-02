import React from 'react'
import { MdExplore,MdNotificationsActive,MdSettings} from "react-icons/md"
import {GoSignOut} from "react-icons/go"
import  "./Sidebar.css"
import { Link } from "react-router-dom";
import "../Home/Home.css"

function Sidebar() {
    const logout = () => {
        console.log("bye")
        eraseCookie('username')
    }

    return (
        <div>
            <div className="sidenav">
                <div className="sidenav-container">
                    <ul className="sidenav-list">
                        <li className="sidenav-item">
                        <MdExplore  className="sidenav-icon"/>
                        </li>
                       <li className="sidenav-item">
                        <MdNotificationsActive className="sidenav-icon"/>
                        </li>
                      <li className="sidenav-item">
                        <MdSettings  className="sidenav-icon"/>
                        </li>
                       <li className="sidenav-item">
                        <GoSignOut className="sidenav-icon"/>
                        <span className="sidenav-text">Sign Out</span>
                        </li>
                    </ul>
                </div>
            </div>
           
         

        </div>
    )
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

export default Sidebar
