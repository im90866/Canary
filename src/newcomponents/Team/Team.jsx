import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import "./Team.css"
import {FaSearch} from 'react-icons/fa'
import Cardone from "../Settings/Cardone"
import Cardtwo from "../Settings/Cardtwo"
import { useState,} from "react"
import Modal2 from '../Modal2/Modal2'

import { Link } from 'react-router-dom'
function Team() {
  const [openModal, setOpenModal] = useState(false);
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
           <h1 className="cptitle2">Rename Project</h1>
           <p>We can rename our project file by entering an new name for the project and updating it</p>
           <label for="vehicle1"> Project Name</label>
          <input type="text" className='change-text105'/><br></br>
  <button className='rename-btn'>Rename project</button>
       </div>
   
  </div>

  </div>
     </body>
    </div>
  )
}

export default Team