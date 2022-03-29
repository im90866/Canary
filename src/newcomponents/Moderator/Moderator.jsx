import React from 'react'
import"./Moderator.css"
import Sidebar from "../Sidebar/Sidebar"

import Topbar2 from '../Topbar2/Topbar2'
import Topbar from '../Topbar/Topbar'
function Moderator() {
  return (
    <div>
    <body className="profilecc">
    <Topbar2/> 
      <Sidebar/>
  
    <div className="profile-container">
        <div className="profileconc">
      
        <div className='profile-image-cropper'>
          <img src="/images/profile.jpg" className="profile-image"/>
        </div>

        <h1 className="profile-user">Username</h1>
        <button className='message-btn5'>Message</button>
        </div>
        </div>
    </body>
    </div>
  )
}

export default Moderator