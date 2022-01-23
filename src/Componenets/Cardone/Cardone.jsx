import "./Cardone.css"

import React from 'react';
import {BiEdit} from "react-icons/bi";
import {BsFillTrashFill} from "react-icons/bs";
function Cardone() {
  return <div>
      <div className="project">
          <div className="existing-projects">
              <span className="title">Existing Projects</span>
              <ul className="projectlist">
                  <div className="projectlistname">
                  <li >Project1</li>
                  <BiEdit className="project-icon"/>
                  <BsFillTrashFill className="project-delete"/>
                  </div>
                  <div className="projectlistname">
                  <li >Project2</li>
                  <BiEdit className="project-icon"/>
                  <BsFillTrashFill className="project-delete"/>
                  </div>
                  <div className="projectlistname">
                  <li >Project3</li>
                  <BiEdit className="project-icon"/>
                  <BsFillTrashFill className="project-delete"/>
                  </div>
                  <div className="projectlistname">
                  <li >Project4</li>
                  <BiEdit className="project-icon"/>
                  <BsFillTrashFill className="project-delete"/>
                  </div>
              </ul>
          </div>
      </div>
  </div>;
}

export default Cardone;
