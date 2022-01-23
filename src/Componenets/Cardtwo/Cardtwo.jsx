
import React from 'react';
import "./Cardtwo.css"
function Cardtwo() {
  return <div>
   
       <div className="create-project">
       <div className="create-projecttitle">
           <span class="cptitle">Create Project</span>
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
      <button className='hero-btn'>Create project</button>
   </div>
  </div>;
}

export default Cardtwo;
