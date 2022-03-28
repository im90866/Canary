import React from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../Topbar/Topbar';
import "./Editprofile.css"
function Editprofile() {
  return <div>
      <Topbar/>
      <div className="project-container">
      <div className="project">
          <div className="existing-projects">
             
              <ul className="projectlist">
                  <div className="projectlistname">
               <Link to="/editprofile"><li >Edit Profile</li></Link>
                  </div>
                  <div className="projectlistname">
                  <Link to="/changepassword"> <li >Change Password</li></Link>
                 
                  </div>
                  <div className="projectlistname">
                 <li >Privacy And Security</li>
                
                  </div>
                  <div className="projectlistname">
                <li >Help</li>
                  
                  </div>
              </ul>
          </div>
      </div>
      <div className="create-project">
          <div className="existing-details">
              <img src="images/avatar.png" alt=""  className='profile-pics'/>
              <h2 className='username'>Nashwa Abdul</h2>
             <button className='change-pic'>Change Profile picture</button>
            
          </div>
          <div className="change-username">
          <form>
          <label for="fname">Name</label>
          <input type="text" className='change-text'  name="Name"/><br></br>
            <label for="lname">Username</label>
          <input type="text" className='change-text' name="username"/><br></br>
          <label for="lname">Email</label>
          <input type="text" className='change-text' name="email"/><br></br>
          </form>
          </div>
         <button className='submit-btn'>Submit Changes</button>          
     </div>
   </div>
  </div>;
}

export default Editprofile;

