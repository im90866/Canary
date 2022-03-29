import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import "./Team.css"
import { FaSearch } from 'react-icons/fa'
import Cardone from "../Settings/Cardone"
import Cardtwo from "../Settings/Cardtwo"
import axios from 'axios'
import { useState, useEffect } from "react"
import Modal2 from '../Modal2/Modal2'
import { useNavigate, useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'
import Modal15 from '../Modal15/Modal15'
function Team() {
  const projectId = useParams()['id']
  const [openModal5, setOpenModal5] = useState(false);
  const [oriProjectName, setOriProjectName] = useState("")
  const [projectName, setProjectName] = useState("")

  const navigate = useNavigate()

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value)
  }

  const goTo = (loc) => {
    if (loc == '/')
      navigate('/' + projectId + "/projectsettings")
    else if (loc == '/permissions')
      navigate('/' + projectId + "/projectsettings/permissions")
  }

  const updateName = async () => {
    if (oriProjectName != projectName) {
      const request = {
        'projectID': projectId,
        'newProjectName': projectName
      }

      await axios.post("http://localhost:8000/updateProjectName/", request).then((res) => {
        if (res.data["error"]) {
          console.log(res.data['error'])
        }
        else {
          window.sessionStorage.setItem("currentProjectName", projectName);
          window.location.reload();
        }
      })
    }
  }

  useEffect(() => {
    axios.get("http://localhost:8000/getProjectName/" + projectId).then((res) => {
      setOriProjectName(res.data['projectName'])
      setProjectName(res.data['projectName'])
    })

    document.addEventListener('click', (e) => {
      if (openModal5)
        setOpenModal5(false)
    })

    if (openModal5) {
      document.getElementById('teamscc').style.filter = 'blur(5px) grayscale(0%)'
    } else {
      document.getElementById('teamscc').style.filter = 'blur(0px) grayscale(0%)'
    }
  }, [openModal5])

  return (
    <div>
      <body className="teamscc" id = "teamscc">
        <div className="settings-container">
          <div className="settings-bar">

            <div className="settings-pro">
              <ul className="settinglist">
                <div className="settinglistname" onClick={() => goTo('/')}>
                  <li className='setting-listli'> Edit  Project</li>
                </div>
                <div className="settinglistname" onClick={() => goTo('/permissions')}>
                  <li className='setting-listli'>Permissions</li>
                </div>
                <div className="settinglistname" onClick={(e) => { setOpenModal5(true); e.stopPropagation()}}>
                  <li className='setting-listli'>Delete Project</li>
                </div>
              </ul>
            </div>
          </div>


          <div className="change-password4">
            <div className="change-password-title">
              <h1 className="cptitle4">Edit Project</h1>

              <label for="vehicle1" className='ad'> Project Name</label>
              <input type="text" className='change-text105' onChange={handleProjectNameChange} value={projectName} /><br></br>
              <label for="vehicle1" className='ad'> Admin Name</label>
              <input type="text" className='change-text105' /><br></br>
              <button className='rename-btn' onClick={!openModal5 ? () => updateName() : null}>Make changes</button>
            </div>
          </div>

        </div>
      </body>
      {openModal5 && <Modal15 type="project" projectID={projectId} closeModal={setOpenModal5} />}

    </div>
  )
}

export default Team