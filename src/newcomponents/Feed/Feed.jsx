import React from 'react'
import "./Feed.css"
import Post from '../Post/Post'

import { Posts } from "../../dummy.js";

function Feed() {
    return (
      <>
      <div className="feed-container">
        {/* <CreatePost/> */}
      <div className="wrapper1">
    
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
    </div>
    </div>
      </>
           
    )
}

export default Feed
