import React from 'react'
import { Link } from 'react-router-dom'
import"./Settings.css"
function Cardsix() {
  return (
      <>
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
           <h1 className="cptitle2">Privacy And Security</h1>
          <h2 className='account-pr'>Account Privacy</h2>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
  <label for="vehicle1"> Private Account</label><br></br>
  <p>When your account is private, only people you approve can see your photos and videos on Canary. Your existing followers won't be affected.</p>
  <h2 className='account-pr'>Activity Status</h2>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
  <label for="vehicle1">Show Activity Status</label><br></br>
  <p>Allow accounts you follow and anyone you message to see when you were last active on Canary apps. </p>
       </div>
   
  
       </div>
        </div>
        </body>
        </>
  )
}

export default Cardsix