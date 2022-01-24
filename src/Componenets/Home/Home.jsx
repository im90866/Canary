import React from 'react'
import Feed from '../Feed/Feed'

// import Post from '../Post/Post'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'

import "./Home.css"
function Home() {
    return (
        <div>
            <div className="home-container">
      <Topbar/> 
           {/* <Sidebar/>   */}
              <Feed/>   
          </div>
        </div>
    )
}

export default Home
