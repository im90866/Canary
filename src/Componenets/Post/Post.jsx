import React from 'react'
import "./Post.css"
 //import "../Home/Home.css"
import { AiFillLike } from "react-icons/ai";
import {BsFillBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Users } from "../../dummy.js";
import { useState } from "react";

function Post({post}) {
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
    return (
        <>
         <div className="card">
      <div className="card__body">
        <div className="img">
  <img src={post.photo} className="card__image" alt=""/>
  <Link to="/postbig"> <div className="image__overlay image__overlay--primary">
        <BsFillBookmarkFill  className="save-icon"/>
        <p className="image__description">
            {post?.desc}
        </p> 
       
    </div> </Link>
        </div>
        <div className="profile">
          <img src={post.profilePicture}alt="profile" className='profilepic' />
        <span className="card__title">{post.username}</span>
        <div className="icons">
       
        <AiFillLike className="like-icon" onClick={likeHandler}/>
        <span className="icontext">{like}</span>
        
        
        </div>
        </div>
        
      </div>
   
    </div>


        </>
    )
}

export default Post
