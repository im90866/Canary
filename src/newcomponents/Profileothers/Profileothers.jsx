import React from 'react'
import Topbar from '../Topbar/Topbar'
import Sidebar from '../Sidebar/Sidebar'
import { Link } from 'react-router-dom'
function Profileothers() {
  return (
    <div>
         <Topbar/>
      
      <div className="profile-container">
      <Sidebar/>
    <div>
      <img src="/images/avatar3.png" alt="" className="profile-image"/>
      <h1 className="profile-user">Nashwa_Abdul</h1>
    
    </div>
   <div className="post-info">
<h2 className="collaborations"><Link to="/profile/collaborations">Collaborations</Link></h2>
    <h2 className="posts1"><Link to="/profile/profileposts">Posts</Link></h2>
    </div>
 <div className="wrapper">
    <div className="card1">
    <div className="card__body1">
      <div className="img1">
 <img src="https://cdn.pixabay.com/photo/2022/01/11/14/09/bird-6930700__340.jpg" className="card__image" alt=""/>    
</div>

</div></div>

<div className="card1">
    <div className="card__body1">
      <div className="img1">
 <img src="https://cdn.pixabay.com/photo/2022/01/11/14/09/bird-6930700__340.jpg" className="card__image" alt=""/>    
</div>

</div></div>  <div className="card1">
    <div className="card__body1">
      <div className="img1">
 <img src="https://cdn.pixabay.com/photo/2022/01/11/14/09/bird-6930700__340.jpg" className="card__image" alt=""/>    
</div>

</div></div>
</div>   
   

</div>
    </div>
  )
}

export default Profileothers