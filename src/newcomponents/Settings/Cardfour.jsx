import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Cardone from './Cardone'
import { Link } from 'react-router-dom'
function Cardfour() {
  return (
    <div>
       <body className="settingscc1">
        <div className="settings-container">
        <div className="settings-bar">
       
       <div className="settings">
        <div className="settings-pic">
          <img src="/images/avatar.png" alt="" className='pic-sett'/>
          <h3 className="pic-sett-title">Welcome Newfez</h3>
        </div>
          <ul className="settinglist">
              <div className="settinglistname">
      <li  className='setting-listli'> <Link to ="/settings">Edit Profile</Link></li>
              </div>
              <div className="settinglistname">
                <li  className='setting-listli'><Link to ="/changepassword">Change Password</Link></li>  
              </div>
              <div className="settinglistname">
                <li  className='setting-listli'><Link to ="/blocked">Block Users</Link></li>  
              </div>
              <div className="settinglistname">
                <li  className='setting-listli'><Link to ="/privacy">Privacy And Security</Link></li>  
              </div>
          
              <div className="settinglistname">
              <li  className='setting-listli'><Link to ="/delete">Delete Account</Link></li>
              </div>
          </ul>
      </div>
  </div>
          
    
            <div className="change-password">
           <div className="change-password-title">
               <h1 className="cptitle1">Blocked Users</h1>
               <p className='block'>Blocked users will no longer be allowed to: follow you, see your work in their feed, comment on your work, add your work to a moodboard, and message you.</p>

           </div>
           <label for="fname" className='fname'>Enter Username</label>
           <input type="text" className='change-text9'  name="Username"/><br></br>
           <button className='submit-changes btnn' type='submit'>Block User</button>

           </div>
            </div>
            </body>
    </div>
  )
}

export default Cardfour