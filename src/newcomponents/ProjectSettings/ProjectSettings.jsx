import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import "./ProjectSettings.css"
import {FaSearch,FaHome} from 'react-icons/fa'
function ProjectSettings() {
  return (
    <div>
        <Topbar/>
        <div className="ps-container">
        <Sidebar/>
        <div className="ps-box">
          <div className="team-title">
              <h1 className="ttitle">
                 Teams
              </h1>
          </div>
          <div className="searchbar1">
          <FaSearch className="searchIcon" />
          <input
            placeholder="Search for friend to add them as your team members"
            className="searchInput1"
          />
        </div>
        <ul className="project-memberslist">
            <li className="members">Nashwa Abdul </li>
            <li className="members">Aachal Davey </li>
            <li className="members">Aazim Faiz </li>
            <li className="members">Naina Agarwal </li>
            <li className="members">Ismail Mohammad </li>
            <li className="members">Aaron Abraham </li>
            <li className="members">Gurav Navyar </li>
            <li className="members">Madiha Kazi </li>
            <li className="members">Moaz Mohammad </li>
          
        </ul>
        </div>
        </div>
       

    </div>
  )
}

export default ProjectSettings