import React from 'react'
import Topbar from '../Topbar/Topbar'
import "./Home.css"
import Sidebar from '../Sidebar/Sidebar'
import Feed from "../Feed/Feed"
function Home() {
  return (
    <div>
  <Topbar/>    
      <div className="home-container">
    <Sidebar/>   
       <Feed/>    
      </div>
    </div>
  )
}

export default Home