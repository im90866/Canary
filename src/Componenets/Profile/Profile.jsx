import React from 'react';
import Topbar from '../Topbar/Topbar';
import "./Profile.css"
import {Link} from "react-router-dom"
function Profile() {
  return <div>
        <Topbar/>  
       <div className="profile-container">
         <div className="profile">
           <img src="images/avatar.png" alt=""  className='profile-pic'/>
           <div className="profile-info2">
           <h4 className='profile-name'>Nashwa Abdul</h4>
         <button className='edit-profile'>Edit Profile</button> 
           <div className="profile-info">
           <span className='info'>2 Posts</span>
           <span className='info'>1 Collaboration</span>
         
        
          </div>
          <div className="btns">
          <Link to ="/profileposts"><button className="post-btn">Posts</button></Link>
          <Link to ="/collaborations"><button className="post-btn">Collaborations</button></Link>
          </div>
          </div>
         </div>
        
       </div>
     

  </div>;
}

export default Profile;
