import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Cardone from './Cardone'
function Cardfour() {
  return (
    <div>
        <Topbar/>
        <Sidebar/>
        <div className="settings-container1">
            <Cardone/>
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