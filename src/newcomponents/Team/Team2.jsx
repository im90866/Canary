import React from 'react'
import { Link } from 'react-router-dom'
function Team2() {
  return (
    <div>
            
     <body className="teamscc">
       
       <div className="settings-container">
       <div className="settings-bar">
     
     <div className="settings-pro">
      
        <ul className="settinglist">
            <div className="settinglistname">
    <li  className='setting-listli'> <Link to ="/team">Edit Project</Link></li>
            </div>
            <div className="settinglistname">
              <li  className='setting-listli'><Link to ="/admin">Permissions</Link></li>  
            </div>
            <div className="settinglistname">
              <li  className='setting-listli'>Delete Project</li>  
            </div>
     
        
          
        </ul>
    </div>
  </div>
        
  
          <div className="change-password3">
         <div className="change-password-title">
             <h1 className="cptitle2">Remove Member</h1>
             <p>Remove memebers of the project</p>
             <label for="vehicle1"> Name</label>
            <input type="text" className='change-text105'/><br></br>
    <button className='rename-btn'>Remove Member</button>
         </div>
     
    </div>
  
    </div>
       </body>
    </div>
  )
}

export default Team2