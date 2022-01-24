import React from 'react';

import Topbar from '../Topbar/Topbar';
import "./Update.css"
import {BiEdit} from "react-icons/bi";
import {BsFillTrashFill} from "react-icons/bs";
import {Link} from "react-router-dom"
import Cardone from '../Cardone/Cardone';
function Update() {
  return (
     <div>
<Topbar/>
<div className="project-container">
<Cardone/>
<div className="create-project">
       <div className="create-projecttitle">
           <span class="cptitle">Update Project</span>
       </div>
      <div className="project-form">
          <input type="text"
          className='field'
          placeholder="Project Name"
          name="Project Name" /><br></br>
          <label for="project-type " className='type'>Project Type</label>
      <select id="project-type" name="project-type" className='project-type'>
      <option value="individual">Individual Project</option>
      <option value="group">Group Project</option>
</select><br></br>
<br></br>
<label for="members-names" className='members'>Names of the members</label><br></br>

<input type="text"
          className='field'
          placeholder="Member Name"
          name=" Member Name" />
            <input type="text"
          className='field'
          placeholder="Member Name"
          name="Member Name" />
            <input type="text"
          className='field'
          placeholder="Member Name"
          name="Member Name" />
            <input type="text"
          className='field'
          placeholder="Member Name"
          name="Member Name" />
      </div>
      <Link to="/projects"><button className='hero-btn'>Update project</button></Link>
   </div>
        
</div>
     </div>
  );
}

export default Update;
