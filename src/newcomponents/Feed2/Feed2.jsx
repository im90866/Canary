import React, {useEffect, useState} from 'react'
import {IoArrowBackSharp  } from "react-icons/io5";
import Post from '../Post/Post';
import { AiFillLike } from "react-icons/ai";
import"./Feed2.css"
import axios from 'axios'
import { Link, useParams,} from 'react-router-dom';

function Feed2() {
  const type = useParams()['category']
  const [postList, setPostList] = useState([])

  useEffect(() => {
    console.log(type)
    let val = type
    if(val == 'popular') {
      console.log('yes')
      val = 'hot'
    }
      

    axios.get("http://localhost:8000/getCategory/" + String(getCookie('userID')) + '/' + val)
      .then((res) => {
        setPostList(res.data['postList'])
      })
  }, [])

  return (
    <div>
      <body className="profilecc">
        <div className="feed-container2">
          <div className="explore-title">
            <h1 className='etitle1'>  <Link to="/home"><IoArrowBackSharp className='back1-arrow' /></Link>
            {type == 'discover' && "Discover New Works"} 
            {type == 'popular' && "Popular Posts Right Now"}
            {type == 'following' && "From Profiles You Follow"}</h1>
          </div>
          <div className="wrapper1">
          {
            postList.map((p) =>
            
            <Post key={p.postID} post={p} />
            
            )
          }
          </div>
        </div>
      </body>
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

export default Feed2