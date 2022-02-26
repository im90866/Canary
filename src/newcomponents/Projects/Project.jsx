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
    
        <div className="project-container">
        <Sidebar/>
            <div className="project">
                <div className="project-title">
                    <h1 className='title'>Your Projects</h1>
                    {/* {/* <button className='hero-btn' onClick={() =>
          setOpenModal(true)}>New Project</button> */}
          <button className="hero-btn"onClick={() =>
          setOpenModal(true)}> New Project</button>
                    </div> 

                 
                    <div className="project-container2">
                      <ul className="project-list">
                        <Link to="/workspace"><li className="project-list-item">
                          <span className='project-name'>Clipart base</span>
                          <span className='dots'>...</span>
                          </li></Link>
                          <Link to="/workspace"><li className="project-list-item">
                          <span className='project-name'>Clipart base</span>
                          <span className='dots'>...</span>
                          </li></Link>
                          <Link to="/workspace"><li className="project-list-item">
                          <span className='project-name'>Clipart base</span>
                          <span className='dots'>...</span>
                          </li></Link>
                          <Link to="/workspace"> <li className="project-list-item">
                          <span className='project-name'>Clipart base</span>
                          <span className='dots'>...</span>
                          </li></Link>
                          <Link to="/workspace"> <li className="project-list-item">
                          <span className='project-name'>Clipart base</span>
                          <span className='dots'>...</span>
                          </li></Link>
                          <Link to="/workspace"> <li className="project-list-item">
                          <span className='project-name'>Clipart base</span>
                          <span className='dots'>...</span>
                          </li></Link>
                          <Link to="/workspace"> <li className="project-list-item">
                          <span className='project-name'>Clipart base</span>
                          <span className='dots'>...</span>
                          </li></Link>
                          <Link to="/workspace">  <li className="project-list-item">
                          <span className='project-name'>Clipart base</span>
                          <span className='dots'>...</span>
                          </li></Link>
                        
                        
                      </ul>

</div>   
                  
                 
            </div>
            
        </div>
         {openModal && <Modal closeModal={setOpenModal} />} 
     

 
    </div>
  )
}

export default Project