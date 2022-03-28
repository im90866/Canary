import React from 'react'
import { Link } from 'react-router-dom'
function Team3() {
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
             <h1 className="cptitle2">Delete Project</h1>
             <p ><strong>Would you like to delete your project: name ?</strong>
<br></br>This project contains 12 folders and drafts. Deleting your project will remove all of your content and data associated with it..</p>
          
    <button className='rename-btn'>Delete project</button>
         </div>
     
    </div>
  
    </div>
       </body>
    </div>
  )
}

export default Team3