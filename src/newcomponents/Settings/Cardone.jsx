import React from 'react'
import { Link } from 'react-router-dom'
import "./Settings.css"
function Cardone() {
  return (
    <div>
           <div className="settings-bar">
          <div className="settings">
              <ul className="settinglist">
                  <div className="settinglistname">
          <li  className='setting-listli'> <Link to ="/settings">Edit Profile</Link></li>
                  </div>
                  <div className="settinglistname">
                    <li  className='setting-listli'><Link to ="/changepassword">Change Password</Link></li>  
                  </div>
              
                  <div className="settinglistname">
                  <li  className='setting-listli'><Link to ="/delete">Delete Account</Link></li>
                  </div>
              </ul>
          </div>
      </div>
    </div>
  )
}

export default Cardone