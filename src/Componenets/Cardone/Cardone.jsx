import "./Cardone.css"
import api from '../../API/projects'
import React, { useState, useEffect } from 'react';
import { BiEdit } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import Cardtwo from "../Cardtwo/Cardtwo";

function Cardone({}) {

    const [projects, setProjects] = useState([])
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

    const removeProject = async(id) =>{
        await api.delete(`/allProjects/${id}`)
        const newProjectList = projects.filter((project) =>{
            return project.id !== id
        })
        setProjects(newProjectList)
    }

    const editProject = (id) =>{
        
    }

    return <div>
        <div className="project">
            <div className="existing-projects">
                <span className="title">Existing Projects</span>
                <ul className="projectlist">
                    {
                        projects.map(project =>
                            <div className="projectlistname" key={project.id}>
                                <li >{project.projectName}</li>
                                <BiEdit className="project-icon" onClick={() => editProject(project.id)}/>
                                <BsFillTrashFill className="project-delete" onClick={() => removeProject(project.id)}/>
                            </div>
                        )
                    }
                </ul>
            </div>
        </div>
    </div>;
}

export default Cardone;
