import React from 'react'
import { Link } from 'react-router-dom'
function Team1() {
  return (
    <div>
         <body className="teamscc">
       
       <div className="settings-container">
       <div className="settings-bar">
     
     <div className="settings-pro">
      
        <ul className="settinglist">
            <div className="settinglistname">
    <li  className='setting-listli'> <Link to ="/team">Rename Project</Link></li>
            </div>
            <div className="settinglistname">
              <li  className='setting-listli'><Link to ="/admin">Admin</Link></li>  
            </div>
            <div className="settinglistname">
              <li  className='setting-listli'><Link to ="/remove">Remove Member</Link></li>  
            </div>
            <div className="settinglistname">
              <li  className='setting-listli'><Link to ="/deleteproject">Delete Project</Link></li>  
            </div>
        
          
        </ul>
    </div>
  </div>
        
  
          <div className="change-password3">
         <div className="change-password-title">
             <h1 className="cptitle2">Change Admin</h1>
             <p>Change the name of the admin of the project</p>
             <label for="vehicle1"> Admin Name</label>
            <input type="text" className='change-text105'/><br></br>
    <button className='rename-btn'>Update Project</button>
         </div>
     
    </div>
  
    </div>
       </body>
    </div>
  )
}

export default Team1