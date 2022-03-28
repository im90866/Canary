import React, {useEffect, useState} from 'react';
import Topbar from '../Topbar/Topbar'
import "./Profile.css"
import {Link} from "react-router-dom"

function Profile() { 
  const [username, setUsername] = useState("")
 
  useEffect(() => {
    setUsername(String(getCookie('username')))
  }, [])

  return (<div>
  <Topbar/>  
    <div style={{display:"flex",justifyContent:"space-around",margin:"18px 0px" ,borderBottom:"1px solid gray"}} className="profile-container">
      <div>
        <img src="images/avatar.png" alt="" style={{width:"160px",height:"160px",borderRadius:"80px"}} className="profile-image"/>
      </div>
      <div className='profile-info'>
      <div className="profile">
        <h4 className='profile-name'>{}</h4>
        
        <Link to="/editprofile"><button className='btn'>Edit Profile</button></Link>
        </div>
        
     
      <div style={{display:"flex" ,justifyContent:"space-between", width:"10%" }} className="follow-info">
          <h6 className='info'>3 Posts</h6>
          <h6 className='info'>3 Collaborations</h6> 
        

        </div> 

      </div>
    </div>
 <div className="profile-posts">
  <Link to="/profileposts"><button className='display'>Posts</button></Link>
   <Link to="/collaboration"><button  className='display'>Collaborations</button></Link>
   <button  className='display'>Saved</button >
 </div>
  </div>
  );
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

export default Profile;
