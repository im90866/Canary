import React from 'react'
import Topbar from '../Topbar/Topbar'
import "./Home.css"
import Sidebar from '../Sidebar/Sidebar'
import Feed from "../Feed/Feed"

function Home(prop) {
  const post = prop.post

  return (
    <div>
      <div className="home-container">
        <Feed posts={post} />
      </div>
    </div>
  )
}

export default Home