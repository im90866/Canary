import React from 'react'
import "./Project.css"
import Topbar  from "../Topbar/Topbar"
import Sidebar from '../Sidebar/Sidebar'
import Modal from "../Modal/Modal"
import { useState,} from "react"
import { Link } from 'react-router-dom'
function Project() {
    const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Topbar/>
      <Sidebar/>
        <div className="project-container">
          
            <div className="project">
                <div className="project-title">
                    <h1 className='title'>Your Projects</h1>
                    {/* {/* <button className='hero-btn' onClick={() =>
          setOpenModal(true)}>New Project</button> */}
          <button className="hero-btn"onClick={() =>
          setOpenModal(true)}>New Project</button>
                    </div> 

                 
                   
                  
                 
            </div>
        </div>
         {openModal && <Modal closeModal={setOpenModal} />} 
  <div className="project-list-container">
  <Link to="/workspace"><div className="project-list">
     <img src="/images/avatar.png" alt="" className='project-pic' />
     <span className="projectname">Clipart Base</span>
     <span className="dots">...</span>
     </div></Link>
     <div className="project-list">
     <img src="/images/avatar.png" alt="" className='project-pic' />
     <span className="projectname">Clipart Base</span>
     <span className="dots">...</span>
     </div>
      <div className="project-list">
     <img src="/images/avatar.png" alt="" className='project-pic' />
     <span className="projectname">Clipart Base</span>
     <span className="dots">...</span>
     </div>
     <div className="project-list">
     <img src="/images/avatar.png" alt="" className='project-pic' />
     <span className="projectname">Clipart Base</span>
     <span className="dots">...</span>
     </div> 
   
   </div>   
    </div>
  )
}

export default Project