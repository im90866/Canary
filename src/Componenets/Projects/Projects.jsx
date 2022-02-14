import React from 'react';
import Topbar from '../Topbar/Topbar';
import api from '../../API/projects'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BiEdit } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function Projects() {

  const [projects, setProjects] = useState([])
  const [update, setUpdate] = useState(false)
  const [id, setId] = useState("")
  const [projectName, setProjectName] = useState("")
  const [type, setType] = useState("")
  const [members, setMembers] = useState({
    member1: "",
    member2: "",
    member3: "",
    member4: ""
  })

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
    console.log(response)
  }

  // useEffect(() => (async () => setProjects(await getProjects()))(), [])
  useEffect(() => {
    const getAll = async () => {
      const allProjects = await getProjects()
      console.log(allProjects)
      if (allProjects)
        setProjects(allProjects)
    }
    getAll();
  }, [])


  const handleMembers = e => {
    const { name, value } = e.target
    setMembers(member => ({
      ...member,
      [name]: value
    }))
  }

  const addProject = async (project) => {
    console.log(project)

    const request = {
      'projectName': "project1",
      'projectAdmin': String(getCookie('username')),
      'projectID': uuidv4(),
      ...project
    }

    axios.post("http://localhost:8000/createproject/", request).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
    })
  }

  const removeProject = async (id) => {
    await axios.delete("http://localhost:8000/createproject/", id).then((res) =>{
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
    })
    const newProjectList = projects.filter((project) => {
      return project.id !== id
    })
    setProjects(newProjectList)
  }

  const editProject = async (id) => {
    const response = await api.get(`/allProjects/${id}`)
    const { projectName, type, members } = response.data
    setId(id)
    setProjectName(projectName)
    setType(type)
    setMembers(members)
    setUpdate(true)
  }

  const updateProject = async (project) => {
    const response = await api.put(`/allProjects/${project.id}`, project)
    const { id } = response.data
    setProjects(
      projects.map((project) => {
        return project.id === id ? { ...response.data } : project
      })
    )
    setId("")
    setProjectName("")
    setType("")
    setMembers({
      member1: "",
      member2: "",
      member3: "",
      member4: ""
    })
    setUpdate(false)
  }

  return (
    <div>
      <Topbar />
      <div className="project-container">
        <div className="project">
          <div className="existing-projects">
            <span className="title">Existing Projects</span>
            <ul className="projectlist">
              {
                projects.map(project =>
                  <div className="projectlistname" key={project.id}>
                    <Link to={`/workspace/${project.id}`}><li>{project.projectName}</li></Link>
                    <BiEdit className="project-icon" onClick={() => editProject(project.id)} />
                    <BsFillTrashFill className="project-delete" onClick={() => removeProject(project.id)} />
                  </div>
                )
              }
            </ul>
          </div>
        </div>

        <div className="create-project">
          <div className="create-projecttitle">
            <span className="cptitle">Create Project</span>
          </div>
          <input type="text" value={id} hidden />
          <div className="project-form">
            <input type="text"
              className='field'
              placeholder="Project Name"
              name="Project Name"
              value={projectName}
              onChange={event => setProjectName(event.target.value)}
            /><br></br>
            <label htmlFor="project-type " className='type'>Project Type</label>
            <select id="project-type" name="project-type" className='project-type' value={type} onChange={event => setType(event.target.value)}>
              <option value="individual">Individual Project</option>
              <option value="group">Group Project</option>
            </select><br></br>
            <br></br>
            <label htmlFor="members-names" className='members'>Names of the members</label><br></br>

            <input type="text"
              className='field'
              placeholder="Member Name"
              name="member1"
              value={members.member1}
              onChange={handleMembers}
            />
            <input type="text"
              className='field'
              placeholder="Member Name"
              name="member2"
              value={members.member2}
              onChange={handleMembers}
            />
            <input type="text"
              className='field'
              placeholder="Member Name"
              name="member3"
              value={members.member3}
              onChange={handleMembers}
            />
            <input type="text"
              className='field'
              placeholder="Member Name"
              name="member4"
              value={members.member4}
              onChange={handleMembers}
            />
          </div>
          {
            update !== true
              ?
              <button className='hero-btn' onClick={() => addProject({ projectName, type, members })}>Create project</button>
              :
              <button className='hero-btn' onClick={() => updateProject({ id, projectName, type, members })}>Update project</button>
          }
        </div>

      </div>
    </div>

  );
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

export default Projects;
