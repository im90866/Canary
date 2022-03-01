import React from 'react'
import "./Project.css"
import Topbar  from "../Topbar/Topbar"
import Sidebar from '../Sidebar/Sidebar'
import Modal from "../Modal/Modal"
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect} from "react"
import { Link } from 'react-router-dom'

import axios from 'axios'

function Project() {
  const [openModal, setOpenModal] = useState(false);

  const [projects, setProjects] = useState([])
  const [update, setUpdate] = useState(false)
  const [id, setId] = useState("")
  const [projectName, setProjectName] = useState("")
  const [changed, makeChange] = useState(false)

  const getProjects = async () => {
    const response = await axios.get("http://localhost:8000/getproject/" + String(getCookie('username')))
      .then((res) => {
        if (res.data["success"]) {
          console.log("something " + (res.data['projectList'])['0'])
          console.log(res)
          return (res.data['projectList'])
        }
        else
          console.log("Error: " + res.data["error"])
      })
    setProjects(response)
  }

  useEffect(() => {
    makeChange(false)
    const getAll = async () => {
      const allProjects = await getProjects()
      if (allProjects)
        setProjects(allProjects)
    }
    getAll();
  }, [changed])

  const addProject = async (project) => {
    console.log(project)

    const request = {
      'projectName': "project1",
      'projectAdmin': String(getCookie('username')),
      ...project
    }

    axios.post("http://localhost:8000/createproject/", request).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
    })
  }

  const removeProject = async (id) => {
    const request = {
      'projectAdmin': String(getCookie('username')),
      'projectID': id,
    }

    await axios.post("http://localhost:8000/deleteproject/", request).then((res) =>{
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
    })
    
    const newProjectList = projects.filter((project) => {
      return project.id !== id
    })
    setProjects(newProjectList)
  }


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
            <button className="hero-btn"onClick={() => setOpenModal(true)}> New Project</button>
          </div> 

          <div className="project-container2">
            <ul className="project-list">
              {
                projects.map(project =>
                  <div className="projectlistname" key={project.id}>
                    <Link to={`/workspace/${project.id}`}>
                      <li className="project-list-item">
                        <span className='project-name'>{project.projectName}</span>
                        
                      </li>
                    </Link>
                  </div>
                )
              }
            </ul>
          </div>     
        </div>      
      </div>
      {openModal && <Modal closeModal={setOpenModal} makeChange = {makeChange} />} 
    </div>
  )
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
  

export default Project