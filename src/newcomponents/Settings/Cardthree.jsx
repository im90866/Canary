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
               <h1 className="cptitle">Change Password</h1>

           </div>
           <div className="change-name">
                <label for="fname" className='fname'>Old Password</label>
                <input type="password" className='change-text8'  name="First Name"/><br></br>
                <label for="fname" className='lname'>New Password</label>
           
                <input type="password" className='change-text7'  name="Last Name" /><br></br>
                <label for="fname" className='lname'>Confirm new Password</label>
           
                <input type="password" className='change-text6'  name="Last Name" /><br></br>
                <button className='submit-changes3' type='submit'>Change Password</button>
            </div>
       </div>
      </div>
      </body>
    </div>
  )
}

export default Cardthree