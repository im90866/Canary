import React from 'react';
import Cardone from "../Cardone/Cardone";
import Cardtwo from "../Cardtwo/Cardtwo";
import Topbar from '../Topbar/Topbar';
function Projects() {
  return (<div>
      <Topbar/> 
  <div className="project-container">
      <Cardone/>
      <Cardtwo/>
  </div>
    </div>

  );
}

export default Projects;
