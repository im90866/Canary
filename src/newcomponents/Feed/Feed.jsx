import React, { useEffect, useState } from 'react'
import "./Feed.css"
import Post from '../Post/Post'

import { AiOutlineArrowRight } from "react-icons/ai";
import axios from 'axios'

function Feed(prop) {
  const cache = prop.cache
  const setCache = prop.setCache

  const [posts, setPosts] = useState([])

  useEffect(() => {
    if(!('homePosts' in cache)) {
      axios.get("http://localhost:8000/getFeed/" + String(getCookie('userID')))
        .then((res) => {
            if (res.data["success"]) {
                setPosts(res.data['posts'])

                cache['homePosts'] = res.data['posts']
                setCache(cache)
                console.log(res.data['posts'])
            }
            else
                console.log("Error: ")
        })
    }
    else {
      let postList = []

      for(let i = 0; i < cache['homePosts'].length; ++i){
        postList.push(cache['homePosts'][i]['postID'])
      }
      const request = {
        'postList': postList
      }

      setPosts(cache['homePosts'])

      axios.post("http://localhost:8000/getFeedLikes/", request)
              .then((res) => {
                  if (res.data["success"]) {
                    var val={};
                    Object.assign(val, cache);

                    console.log(res.data['postList'])

                    for(let i = 0; i < val['homePosts'].length; ++i){
                      for(let j = 0; j < res.data['postList'].length; ++j) {
                        if(val['homePosts'][i]['postID'] == res.data['postList'][j]['postID']){
                          val['homePosts'][i]['likes'] = res.data['postList'][j]['likes']
                          console.log(val['homePosts'][i]['likes'])
                          break
                        }
                      }
                    }

                    setPosts(val['homePosts'])
                    setCache(val)
                  }
                  else
                      console.log("Error: ")
              })
    }
  }, [])

  return (

    <div className="feed-container">
      {/* <CreatePost/> */}
      <div className="explore-title">
        <h1 className='etitle'>Recommended For You <AiOutlineArrowRight className='arrow' /></h1>
      </div>
      <div className="wrapper1">

        {
          posts.map(p => (
            <Post key={p.postID} post={p} />
          ))
        }

      </div>
      <div className="explore-title">
        <h1 className='etitle'>Recommended For You  <AiOutlineArrowRight className='arrow' /></h1>

      </div>
      <div className="wrapper1">

        {
          posts.map(p => (
            <Post key={p.postID} post={p}/>
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