import React from 'react';
import Profile from '../Profile/Profile';
import {Link } from "react-router-dom" ;
import {BsFillBookmarkFill } from "react-icons/bs";
import "./Profilepost.css"
function Profilepost() {
  return(
    <>
   <div>
    <Profile/>
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
  </>
  );
}

export default Profilepost;
