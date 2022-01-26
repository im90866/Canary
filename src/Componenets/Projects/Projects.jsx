import React from 'react';
import Topbar from '../Topbar/Topbar';
import api from '../../API/projects'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BiEdit } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";

function Projects() {

  const [projects, setProjects] = useState([])
  const [update, setUpdate] = useState(false)

  const getProjects = async () => {
    const response = await api.get("/allProjects")
    return response.data
  }

  useEffect(() => {
    const getAll = async () => {
      const allProjects = await getProjects()
      if (allProjects)
        setProjects(allProjects)
    }
    getAll();
  }, [])

  const [id, setId] = useState("")
  const [projectName, setProjectName] = useState("")
  const [type, setType] = useState("")
  const [members, setMembers] = useState({
    member1: "",
    member2: "",
    member3: "",
    member4: ""
  })

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
      id: uuidv4(),
      ...project
    }

    const response = await api.post("/allProjects", request)
    console.log(response)

    const getAll = async () => {
      const allProjects = await getProjects()
      setProjects(allProjects)
    }
    getAll()
    setId("")
    setProjectName("")
    setType("")
    setMembers({
      member1: "",
      member2: "",
      member3: "",
      member4: ""
    })
  }

  const removeProject = async (id) => {
    await api.delete(`/allProjects/${id}`)
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
                    <li >{project.projectName}</li>
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
            <span class="cptitle">Create Project</span>
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
            <label for="project-type " className='type'>Project Type</label>
            <select id="project-type" name="project-type" className='project-type' value={type} onChange={event => setType(event.target.value)}>
              <option value="individual">Individual Project</option>
              <option value="group">Group Project</option>
            </select><br></br>
            <br></br>
            <label for="members-names" className='members'>Names of the members</label><br></br>

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

export default Projects;
