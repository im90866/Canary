import React from 'react'
import "./Post.css"
 //import "../Home/Home.css"
import { AiFillLike } from "react-icons/ai";
import {BsFillBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Users } from "../../dummy.js";
import { useState, useEffect} from "react";

function Post(post) {
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)
  
  const vPost = post['post']

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="card">
      <div className="card__body">
        <div className="img">

          <img src={vPost['imageVal'][0]} className="card__image" alt=""/>    

          <div className="profile">
            <img src={post.imageVal}alt="profile" className='profilepic' />
            <span className="card__title">{vPost.uploader}</span>
            <div className="icons">
              <AiFillLike className="like-icon" onClick={likeHandler}/>
              <span className="icontext">{like}</span> 
            </div>  
          </div> 

        </div>
      </div>
    </div> 
  )
}

export default Post
