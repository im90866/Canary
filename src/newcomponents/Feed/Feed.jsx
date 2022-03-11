import React, {useEffect, useState} from 'react'
import "./Feed.css"
import Post from '../Post/Post'

import { Posts } from "../../dummy.js";
   
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from 'axios'

function Feed(prop) {
  const posts = prop.posts

  useEffect(async () => {
    
  }, [])

  return (
   
    <div className="feed-container">
    {/* <CreatePost/> */}
     <div className="explore-title">
    <h1 className='etitle'>Recommended For You <AiOutlineArrowRight className='arrow'/></h1>
  </div> 
    <div className="wrapper1">

    {
      posts.map(p => (
        <Post key={p.postID} post={p} />
      ))
    }

    </div>
    <div className="explore-title">
    <h1 className='etitle'>Recommended For You  <AiOutlineArrowRight className='arrow'/></h1>

  </div> 
    <div className="wrapper1">

    {
      posts.map(p => (
        <Post key={p.postID} post={p} />
      ))
    }

    </div>
    <div className="explore-title">
    <h1 className='etitle'>Recommended For You  <AiOutlineArrowRight className='arrow'/></h1>

  </div> 
    <div className="wrapper1">

    {
      posts.map(p => (
        <Post key={p.postID} post={p} />
      ))
    }

    </div>
    <div className="explore-title">
    <h1 className='etitle'>Recommended For You  <AiOutlineArrowRight className='arrow'/></h1>

  </div> 
    <div className="wrapper1">
    {
        posts.map(p => (
          <Post key={p.postID} post={p} />
        ))
      }
      </div>
    </div>
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


export default Feed
