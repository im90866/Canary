import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Cardone from './Cardone'
import { useState,} from "react"
import Modal3 from '../Modal3/Modal3'
import { Link } from 'react-router-dom'
function Cardfive() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
         <body className="settingscc1">
    
        <div className="settings-container1">
        <div className="settings-bar">
          <div className="settings3">
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
        <div className="change-password1">
           <div className="change-password-title">
               <h1 className="cptitle2">Delete Account</h1>
               <p className='block'><strong>Would you like to delete your Canary account: @Nashwa_Abdul?</strong>
<br></br>This account contains 1 projects and drafts. Deleting your account will remove all of your content and data associated with it..</p>
<button className='submit-changes btnn1' type='submit'  onClick={() =>
          setOpenModal(true)}>Delete Account</button>
            
           </div>
         
           </div>
           {openModal && <Modal3 closeModal={setOpenModal} />} 
        </div>
        </body>
    </div>
  )
}

export default Cardfive