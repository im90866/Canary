import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Cardone from './Cardone'
import "./Settings.css"

function Cardthree() {
  return (
    <div>
        <Topbar/>
        <Sidebar/>
        <div className="settings-container1">
            <Cardone/>
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
                <button className='submit-changes' type='submit'>Change Password</button>
            </div>
       </div>
    
            </div> 
    </div>
  )
}

export default Cardthree