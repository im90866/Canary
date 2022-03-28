import React from 'react'
import Topbar from '../Topbar/Topbar'
import "./Home.css"
import Sidebar from '../Sidebar/Sidebar'
import Feed from "../Feed/Feed"

function Home(prop) {
  const cache = prop.cache
  const setCache = prop.setCache

  return (
    <div>
      <body className="homebody">
        <div className="home-container">
          <Feed cache={cache} setCache={setCache} />
        </div>
      </body>
    </div>
  )
}

export default Home