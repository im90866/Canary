import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import "./Team.css"
import {FaSearch} from 'react-icons/fa'
import Cardone from "../Settings/Cardone"
import Cardtwo from "../Settings/Cardtwo"
import { useState,} from "react"
import Modal2 from '../Modal2/Modal2'
import { useNavigate, useParams} from 'react-router-dom'

import { Link } from 'react-router-dom'
function Team() {
  const projectId = useParams()['id']
  const [openModal5, setOpenModal5] = useState(false);

  const navigate = useNavigate()

  const goTo = (loc) => {
    if(loc == '/')
      navigate('/' + projectId + "/projectsettings")
    else if(loc == '/permissions')
      navigate('/' + projectId + "/projectsettings/permissions")
  }

  return (
    <div>
     <body className="teamscc">
     <div className="settings-container">
     <div className="settings-bar">
   
   <div className="settings-pro">
      <ul className="settinglist">
        <div className="settinglistname" onClick={() => goTo('/')}>
          <li  className='setting-listli'> Edit  Project</li>
        </div>
        <div className="settinglistname" onClick={() => goTo('/permissions')}>
          <li  className='setting-listli'>Permissions</li>  
        </div>
        <div className="settinglistname" onClick={() => { setOpenModal5(true);}}>
          <li  className='setting-listli'>Delete Project</li>  
        </div>
      </ul>
    </div>
  </div>
      

        <div className="change-password4">
       <div className="change-password-title">
           <h1 className="cptitle4">Edit Project</h1>
          
           <label for="vehicle1"  className='ad'> Project Name</label>
          <input type="text" className='change-text105'/><br></br>
          <label for="vehicle1" className='ad'> Admin Name</label>
            <input type="text" className='change-text105'/><br></br>
  <button className='rename-btn'>Edit project</button>
       </div>
       {openModal5 && <Modal2 type="project" closeModal={setOpenModal5} />} 
  </div>

  </div>
     </body>
    </div>
  )
}

export default Team