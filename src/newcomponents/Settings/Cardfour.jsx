import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Cardone from './Cardone'
import { Link } from 'react-router-dom'
function Cardfour() {
  return (
    <div>
        <Topbar/>
        <Sidebar/>
        <h1 className="settings-title">Settings</h1>
        <div className="settings-container1">
        <div className="settings-bar">
          <div className="settings2">
              <ul className="settinglist">
                  <div className="settinglistname">
          <li  className='setting-listli'> <Link to ="/settings">Edit Profile</Link></li>
                  </div>
                  <div className="settinglistname">
                    <li  className='setting-listli'><Link to ="/changepassword">Change Password</Link></li>  
                  </div>
                  <div className="settinglistname">
                  <li className='setting-listli'><Link to ="/blocked">Block Users</Link></li>
                  </div>
                  <div className="settinglistname">
                  <li  className='setting-listli'><Link to ="/delete">Delete Account</Link></li>
                  </div>
              </ul>
          </div>
      </div>
            <div className="change-password">
           <div className="change-password-title">
               <h1 className="cptitle">Blocked Users</h1>
               <p className='block'>Blocked users will no longer be allowed to: follow you, see your work in their feed, comment on your work, add your work to a moodboard, and message you.</p>

           </div>
           <label for="fname" className='fname'>Enter Username</label>
           <input type="text" className='change-text9'  name="Username"/><br></br>
           <button className='submit-changes btnn' type='submit'>Block User</button>

           </div>
            </div>
    </div>
  )
}

export default Cardfour