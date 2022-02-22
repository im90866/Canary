import React from 'react'
import Profile from '../Profile/Profile'
import Topbar from '../Topbar/Topbar'
import Sidebar from '../Sidebar/Sidebar'
import "./Collaboration.css"
import { Link } from 'react-router-dom'
function Collaboration() {
  return (
    <div>
       <Topbar/>
        <Sidebar/> 
        <div style={{justifyContent:"space-around",margin:"18px 0px" }} className="profile-container">
      <div>
        <img src="/images/avatar3.png" alt="" className="profile-image"/>
        <h1 className="profile-user">Nashwa_Abdul</h1>
        <Link to="/settings"><button className="editp">Edit Profile</button></Link>
      </div>
      <div className="post-info">
<h2 className="collaborations"><Link to="/profile/collaborations">Collaborations</Link></h2>
      <h2 className="posts1"><Link to="/profile/profileposts">Posts</Link></h2>
      </div>
     <div className="wrapper">
      <div className="card">
      <div className="card__body">
        <div className="img">
   <img src="https://cdn.pixabay.com/photo/2022/01/11/14/09/bird-6930700__340.jpg" className="card__image" alt=""/>    
</div>

</div></div>

<div className="card">
      <div className="card__body">
        <div className="img">
   <img src="https://cdn.pixabay.com/photo/2022/01/14/05/10/texture-6936465__340.jpg" className="card__image" alt=""/>    
</div>

</div></div>
<div className="card">
      <div className="card__body">
        <div className="img">
   <img src="https://cdn.pixabay.com/photo/2022/01/01/19/18/air-bubbles-6908693__340.jpg" className="card__image" alt=""/>    
</div>

</div></div>
</div> 
     

</div>
    </div>

  )
}

export default Collaboration