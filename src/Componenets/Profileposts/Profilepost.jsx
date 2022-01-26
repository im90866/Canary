import React from 'react';
import "./Profilepost.css"
import {Link} from "react-router-dom";
import {BsFillBookmarkFill } from "react-icons/bs";
import Profile from "../Profile/Profile"
import Topbar from '../Topbar/Topbar';
function Profilepost() {
  return (<div>
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
       <div className="card-container">
       <div className="card">
      <div className="card__body">
        <div className="img">
  <img src="https://cdn.pixabay.com/photo/2022/01/11/14/09/bird-6930700__340.jpg" className="card__image" alt=""/>
  <Link to="/postbig"> <div className="image__overlay image__overlay--primary">
        <BsFillBookmarkFill  className="save-icon"/>
        <p className="image__description">
        Love For All, Hatred For None.
        </p> 
       
    </div> </Link>
        </div>
        </div>
        </div>
        
        <div className="card">
      <div className="card__body">
        <div className="img">
  <img src="https://cdn.pixabay.com/photo/2022/01/11/14/09/bird-6930700__340.jpg" className="card__image" alt=""/>
  <Link to="/postbig"> <div className="image__overlay image__overlay--primary">
        <BsFillBookmarkFill  className="save-icon"/>
        <p className="image__description">
        Love For All, Hatred For None.
        </p> 
       
    </div> </Link>
        </div>
        </div>
        </div>
  </div>
  </div>
  );
}

export default Profilepost;
