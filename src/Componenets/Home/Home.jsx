import React from 'react'

import Post from '../Post/Post'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'

import "./Home.css"
function Home() {
    return (
        <div>
            <div className="home-container">
          <Topbar/>
              <Sidebar/> 
              <Post/>
          </div>
        </div>
    )
}

export default Home
