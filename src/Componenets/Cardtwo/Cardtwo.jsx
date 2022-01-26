import React, { useState, useEffect } from 'react';
import api from '../../API/projects'
import "./Cardtwo.css"
import { v4 as uuidv4 } from 'uuid';

function Cardtwo({}) {

  const [projects, setProjects] = useState([])
  const getProjects = async () => {
    const response = await api.get("/allProjects")
    return response.data
  }

  const [projectName, setProjectName] = useState("")
  const [type, setType] = useState("")
  const [members, setMembers] = useState({
    member1: "",
    member2: "",
    member3: "",
    member4: ""
  })

  const addProject = async (project) => {
    console.log(project)
    const request = {
      id: uuidv4(),
      ...project
    }

    const response = await api.post("/allProjects", request)
    console.log(response)
    setProjects(response.data)
  }

  useEffect(() => {
    const getAll = async () => {
      const allProjects = await getProjects()
      if (allProjects)
        setProjects(allProjects)
    }
    getAll();
  }, [projectName, type, members])

  return (
    <div>
      <div className="create-project">
        {/* <form onSubmit={add}> */}
        <div className="create-projecttitle">
          <span class="cptitle">Create Project</span>
        </div>
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
            name=" Member Name"
            value={members.member1}
            onChange={event => setMembers(event.target.value)}
          />
          <input type="text"
            className='field'
            placeholder="Member Name"
            name="Member Name"
            value={members.member2}
            onChange={event => setMembers(event.target.value)}
          />
          <input type="text"
            className='field'
            placeholder="Member Name"
            name="Member Name"
            value={members.member3}
            onChange={event => setMembers(event.target.value)}
          />
          <input type="text"
            className='field'
            placeholder="Member Name"
            name="Member Name"
            value={members.member4}
            onChange={event => setMembers(event.target.value)}
          />
        </div>
        <button className='hero-btn' onClick={() => addProject({ projectName, type, members })}>Create project</button>
        {/* </form> */}
      </div>
    </div >
  )
}

export default Cardtwo;
