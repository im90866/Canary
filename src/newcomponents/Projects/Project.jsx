import React, { useRef } from 'react'
import "./Project.css"
import Topbar from "../Topbar/Topbar"
import Sidebar from '../Sidebar/Sidebar'
import Modal from "../Modal/Modal"
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react"
import { Link, NavLink } from 'react-router-dom'

import axios from 'axios'

function Project(prop) {
  const cache = prop.cache
  const setCache = prop.setCache

  const [openModal, setOpenModal] = useState(false);

  const [projects, setProjects] = useState([])
  const [changed, makeChange] = useState(false)

  const [active, setActive] = useState(false)

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
    setActive(false)
    setProjects(response)
  }

  const getGroupProjects = async () => {
    const response = await axios.get("http://localhost:8000/getotherproject/" + String(getCookie('username')))
      .then((res) => {
        if (res.data["success"]) {
          console.log("something " + (res.data['projectList'])['0'])
          console.log(res)
          return (res.data['projectList'])
        }
        else
          console.log("Error: " + res.data["error"])
      })
    setActive(true)
    setProjects(response)
  }

  const addProject = async (project) => {
    console.log(project)

    const request = {
      'projectName': "project1",
      'projectAdminID': String(getCookie('userID')),
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
      'projectAdminID': String(getCookie('userID')),
      'projectID': id,
    }

    await axios.post("http://localhost:8000/deleteproject/", request).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
    })

    const newProjectList = projects.filter((project) => {
      return project.id !== id
    })
    setProjects(newProjectList)
  }

  const setProjectName = async (projectName, projectId) => {
    window.sessionStorage.setItem("currentProjectName", projectName);
    window.sessionStorage.setItem("currentProjectId", projectId);
  }

  useEffect(() => {
    makeChange(false)
    const getAll = async () => {
      const allProjects = await getProjects()
      if (allProjects)
        setProjects(allProjects)
    }
    getAll();
    if (openModal) {
    } else {
      document.getElementById('projectss').style.filter = 'blur(0px) grayscale(0%)'
    }

    document.addEventListener('click', (e) => {
      if (openModal)
        setOpenModal(false)
    })

  }, [openModal])

  return (
    <div>
      <body className="projectss" >
        <div id='projectss'>
          <div className="project-container">
            <div className="project">
              <div className="project-title">
                {
                  active ?
                    <h1 className='title' onClick={getProjects}>Your Projects</h1>
                    :
                    <h1 className='title-active' onClick={getProjects}>Your Projects</h1>
                }

                <h1 className='separator'>|</h1>
                {
                  active ?
                    <h1 className='title-active' onClick={getGroupProjects}>Other Projects</h1>
                    :
                    <h1 className='title' onClick={getGroupProjects}>Other Projects</h1>
                }
                {
                  // Use this but clickable
                  // <h1 className='title'>Your Projects</h1>
                }
                <button
                  className='hero-btn'
                  onClick={
                    (e) => {
                      setOpenModal(true); e.stopPropagation()
                    }}>
                  New Project
                </button>
              </div>
            </div>
          </div>

          <div className="project-container2">
            <ul className="project-list">
              {
                projects.map(project =>
                  <div className="projectlistname"
                    key={project.id}
                    onClick={() => setProjectName(project.projectName, project.projectId)}>
                    <Link to={
                      !openModal
                        ?
                        `/${project.id}/workspace`
                        :
                        ''
                    }>
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
      </body >
      <div onClick={(e) => e.stopPropagation()}>
        {openModal && <Modal closeModal={setOpenModal} makeChange={makeChange} projects={projects} setProjects={setProjects} />}
      </div>
    </div >
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