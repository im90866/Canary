import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import "./Team.css"
import {FaSearch} from 'react-icons/fa'
import Cardone from "../Settings/Cardone"
import Cardtwo from "../Settings/Cardtwo"
import { useState,} from "react"
import Modal2 from '../Modal2/Modal2'
function Team() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      
     <Topbar/>
     <div className="team-container">
     <Sidebar/> 
    
     <div className="team-name">
       <div className="project-settings">
         <h1 className="psettings">Project Settings</h1>
         <div className="change-details">
            <div className="change-name">
                <label for="fname" className='fname'>Project Name</label>
                <input type="text" className='change-text12'  name="First Name" placeholder='Clipart Base'/><br></br>
                <label for="fname" className='lname'>Project Admin</label>
           
                <input type="text" className='change-text2'  name="Last Name" placeholder="Nashwa"/><br></br>
            
            </div>
            <div className="buttonss">
            <button className='submit-changes1' type='submit'>Update Project</button>
                <button className='submit-changes2' type='submit'onClick={() =>
          setOpenModal(true)}>Delete Project</button>
                </div>
               
        </div>
        
       </div>
         
       {openModal && <Modal2 closeModal={setOpenModal} />} 
     </div>
 
     </div>
    
    </div>
  )
}

export default Team