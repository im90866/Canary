import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Cardone from './Cardone'
import "./Settings.css"
import Cardtwo from './Cardtwo'
import { Link } from 'react-router-dom'
function Cardthree() {
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
                  <li  className='setting-listli'><Link to ="/delete">Delete Account</Link></li>
                  </div>
              </ul>
          </div>
      </div>
        
      <div className="edit-profile">
        <div className="existing-details">
      

          <h3 className="profile-username4">Change Password</h3>
        
        </div>

        <div className="change-details1">
          <div className="change-name">
            <label for="fname" className='fname1'>Old Password</label>
            <input 
              type="password" 
              className='change-text8'  
            
            />
            <br></br>     
          </div>

          <div className="username-change1">
            <label for="username" className='fname1'>New Password</label>
            <input 
              type="password" 
              className='change-text7' 
        
            
            />
          </div>

          <div className="email-address">
            <label for="ID" className='fname1'>Confirm New Password
</label>
            <input 
              type="password" 
              className='change-text5' 
              
          
            />
          </div>

        
        </div>
     
        <button className='submit-changes' type='submit' >
         Change Password
        </button>
      </div>
      </div>
      </body>
    </div>
  )
}

export default Cardthree