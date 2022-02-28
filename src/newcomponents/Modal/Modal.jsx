import React from 'react'
import "./Modal.css"
import axios from 'axios'
import { useState} from 'react';

function Modal(props) {
  var closeModal = props.closeModal
  const makeChange = props.makeChange
  const [projectName, setProjectName] = useState("")

  const addProject = async (project) => {
    console.log(project)

    const request = {
      'projectName': project['projectName'],
      'projectAdmin': String(getCookie('username')),
      ...project
    }

    axios.post("http://localhost:8000/createproject/", request).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
    })
    makeChange(true)
  }

  return (
  
    <div>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>
          <div className="title">
            <h1 className='create-title'>New Project</h1>
          </div>
          <div className="body">
            <label for="pname" className='p1name'>Enter Project Name</label>
            <input type="text" 
                  className='change-text10'  
                  name="Project Name" 
                  placeholder='Project Name'
                  onChange={event => setProjectName(event.target.value)}
            /><br></br>

            <div className="div">
              <button className='folder-btn' onClick={() => {addProject({ "projectName" : projectName }); 
                  closeModal(false)}}>Create Project
              </button>
            </div>
          </div>         
        </div>
      </div>
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

export default Modal