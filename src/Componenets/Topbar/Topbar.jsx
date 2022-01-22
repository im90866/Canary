import React from 'react'
import "./Topbar.css"
import { FaSearch, FaHome } from 'react-icons/fa'
import { RiChatSmile2Fill } from "react-icons/ri"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { Link, Router } from "react-router-dom";
function Topbar() {
  return (
      <div>
        <div className="navbar-container">
          <div className="navbar-left">
            <span className="navbar-logo"><Link to="/home">Canary</Link></span>
          </div>
          <div className="navbar-center">
            <div className="navbar-search">
              <FaSearch className="search" />
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
                <Link to="/home"><BsFillPlusCircleFill /></Link>
              </div>
              <div className="navbar-IconItem">
                <Link to="/home"><img src="../images/avatar.png" alt="" className="topbarImg" /></Link>
              </div>
            </div>
          </div>

        </div>

      </div>
  )
}

export default Topbar
