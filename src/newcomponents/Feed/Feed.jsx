import React, {useEffect, useState} from 'react'
import "./Feed.css"
import Post from '../Post/Post'

import { Posts } from "../../dummy.js";

import axios from 'axios'

function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(async () => {
    await axios.get("http://localhost:8000/getFeed/" + String(getCookie('username')))
      .then((res) => {
        if (res.data["success"]) {
          setPosts(res.data['posts'])
          console.log(res.data['posts'])
        }
        else
          console.log("Error: " )
      })
  }, [])

  return (
    <div className="feed-container">
      {/* <CreatePost/> */}
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
