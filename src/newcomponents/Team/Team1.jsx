import React from 'react'
import { Link } from 'react-router-dom'
import { useState,} from "react"
import Modal12 from '../Modal12/Modal12';
import Modal2 from '../Modal2/Modal2';
function Team1() {
  const [openModal5, setOpenModal5] = useState(false);
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
              <li  className='setting-listli'  onClick={() => { setOpenModal5(true);}}>Delete Project</li>  
            </div>
          
          
        </ul>
    </div>
  </div>
        
  
          <div className="change-password4">
         <div className="change-password-title">
             <h1 className="cptitle4">Permissions</h1>
  
             <label for="vehicle1" className='limit'>Limit Users from posting images</label>
             <div className="yesno">
            <input type="radio" value="yes" className='no'/>
            <label for="vehicle1" className='yes'>Yes</label>
         
            <input type="radio" value="no" className='no'/>
            <label for="vehicle1" className='yes'>No</label><br></br>
            </div>
           
  
  <label for="vehicle1" className='limit'>Limit Users from creating channels</label>
  <div className="yesno">
 <input type="radio" value="yes" className='no'/>
 <label for="vehicle1" className='yes'>Yes</label>

 <input type="radio" value="no" className='no'/>
 <label for="vehicle1" className='yes'>No</label><br></br>
 </div>
 <label for="vehicle1"className='limit'>Limit Users from creating new projects</label>
  <div className="yesno">
 <input type="radio" value="yes" className='no'/>
 <label for="vehicle1" className='yes'>Yes</label>

 <input type="radio" value="no" className='no'/>
 <label for="vehicle1" className='yes'>No</label><br></br>
 </div>

 <label for="vehicle1"className='limit'>Allow Users to remix the images posted</label>
  <div className="yesno">
 <input type="radio" value="yes" className='no'/>
 <label for="vehicle1" className='yes'>Yes</label>

 <input type="radio" value="no" className='no'/>
 <label for="vehicle1" className='yes'>No</label><br></br>
 </div>
    <button className='rename-btn'>Update </button>
         </div>
         {openModal5 && <Modal2 closeModal={setOpenModal5} />} 
    </div>
 
    </div>
       </body>
    </div>
  )
}

export default Team1