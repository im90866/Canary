import React from 'react'
import "./Post.css"
 //import "../Home/Home.css"
import { AiFillLike } from "react-icons/ai";
import {BsFillBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Users } from "../../dummy.js";
import { useState, useEffect} from "react";

import axios from 'axios'

function Post(post) {
  const [like,setLike] = useState(post['post']['likes'])
  const [isLiked,setIsLiked] = useState(false)
  
  const vPost = post['post']

  const likeHandler = async ()=>{
    let likeVal = isLiked ? -1 : 1

    const req = {
      'username' : String(getCookie('username')),
      'postID' : vPost.postID,
      'likeChange' : likeVal
    }

    await axios.post('http://localhost:8000/likePost/', req).then((res) => {
      console.log(res)
      setLike(res.data['likes'])
    });

    setIsLiked(!isLiked)
  }

  useEffect(() => {
    if((vPost.likedBy).includes(String(getCookie('username')))) {
      console.log("TRRRUEEEEEEE")
      setIsLiked(true)
    }
  }, [])

  return (
    <>
   
    <div className="card">
      <div className="card__body">
        <div className="img">

          <img src={vPost['imageVal'][0]} className="card__image" alt=""/>    

          <div className="profile">
            <img src={post.imageVal} className='profilepic' />
            <span className="card__title">{vPost.uploader}</span>
            <div className="icons">
              <AiFillLike className="like-icon" onClick={likeHandler}/>
              <span className="icontext">{like}</span> 
            </div>  
          </div> 

        </div>
      </div>
    </div> 
    </>
    
  )
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export default Post
