import React from 'react'
import Topbar from '../Topbar/Topbar'
import "./Home.css"
import Sidebar from '../Sidebar/Sidebar'
import Feed from "../Feed/Feed"
function Home() {
  return (
    <div>
  <Topbar/>  
  <Sidebar/>   
      <div className="home-container">
      
       <Feed/>    
      </div>
    </div>
  )
}

export default Home