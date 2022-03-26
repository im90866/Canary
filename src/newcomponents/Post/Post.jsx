import React from 'react'
import "./Post.css"
 //import "../Home/Home.css"
import { AiFillLike } from "react-icons/ai";
import {BsFillBookmarkFill } from "react-icons/bs";
import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect} from "react";
import { useMediaQuery } from 'react-responsive';
import axios from 'axios'
import { BsThreeDots } from "react-icons/bs";

function Post(post) {
  const navigate = useNavigate()
  const [like,setLike] = useState(post['post']['likes'])
  const [isLiked,setIsLiked] = useState(false)
  
  const vPost = post['post']

  const likeHandler = async ()=>{
    const req = {
      'userID' : String(getCookie('userID')),
      'postID' : vPost.postID,
    }

    await axios.post('http://localhost:8000/likePost/', req).then((res) => {
      console.log(res)
      setLike(res.data['likes'])
      setIsLiked(res.data['likeBoolean'])
    });
  }

  const getUploader = (post) => {
    if(post.memberList.length == 1)
      return post.memberList[0]
  }

  const goToPost = () => {
    navigate('/post/' + vPost.postID)
  }

  useEffect(() => {
    if((vPost.likedBy).includes(String(getCookie('userID')))) {
      setIsLiked(true)
    }
  }, [])

  return (
    <>
   
    <div className="card" onClick={goToPost}>
      <div className="card__body">
        <div className="img">

          <img src={vPost['imageVal'][0]} className="card__image" alt=""/>    

          <div className="profile">
            <img src={getUploader(vPost).profilePicture} className='profilepic' />
            <span className="card__title">{getUploader(vPost).username}</span>
           
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
