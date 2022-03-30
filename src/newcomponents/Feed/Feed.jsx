import React, { useEffect, useState } from 'react'
import "./Feed.css"
import Post from '../Post/Post'
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from 'axios'

function Feed(prop) {
  const navigate = useNavigate()

  const cache = prop.cache
  const setCache = prop.setCache

  const [discoverPosts, setDiscoverPosts] = useState([])
  const [hotPosts, setHotPosts] = useState([])
  const [followingPosts, setFollowingPosts] = useState([])

  const goToCategory = (category) => {
    if(category == 'hot')
      navigate('/home/popular')
    else
    navigate('/home/' + category) 
  }

  useEffect(() => {
    if(!('homePosts' in cache)) {
      axios.get("http://localhost:8000/getFeed/" + String(getCookie('userID')))
        .then((res) => {
            if (res.data["success"]) {
                setDiscoverPosts(res.data['discoverPosts'])
                setHotPosts(res.data['hotPosts'])
                if(res.data['followingPosts'])
                  setFollowingPosts(res.data['followingPosts'])

                cache['discoverPosts'] = res.data['discoverPosts']
                cache['hotPosts'] = res.data['hotPosts']
                cache['followingPosts'] = res.data['followingPosts']
                cache['homePosts'] = true

                console.log(res.data['followingPosts'])

                setCache(cache)
                console.log(res.data['discoverPosts'])
            }
            else
                console.log("Error: ")
        })
    }
    else {
      let postList = []

      for(let i = 0; i < cache['discoverPosts'].length; ++i){
        postList.push(cache['discoverPosts'][i]['postID'])
      }

      for(let i = 0; i < cache['hotPosts'].length; ++i){
        postList.push(cache['hotPosts'][i]['postID'])
      }

      for(let i = 0; i < cache['followingPosts'].length; ++i){
        postList.push(cache['followingPosts'][i]['postID'])
      }

      const request = {
        'postList': postList
      }

      setDiscoverPosts(cache['discoverPosts'])
      setHotPosts(cache['hotPosts'])
      setFollowingPosts(cache['followingPosts'])

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

                    //etPosts(val['homePosts'])
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
        <h1 className='etitle'>Discover New Works <AiOutlineArrowRight className='arrow' onClick={() => goToCategory('discover')}/></h1>
      </div>
      <div className="wrapper1">
        {
          discoverPosts.map(p => (
            <Post key={p.postID} post={p} />
          ))
        }
      </div>

      <div className="explore-title">
        <h1 className='etitle'>Popular Posts Right Now <AiOutlineArrowRight className='arrow' 
            onClick={() => goToCategory('popular')}/></h1>
      </div>
      <div className="wrapper1">
        {
          hotPosts.map(p => (
            <Post key={p.postID} post={p} />
          ))
        }
      </div>

      {
        followingPosts.length > 0 &&
        <>
          <div className="explore-title">
            <h1 className='etitle'>From Profiles You Follow <AiOutlineArrowRight className='arrow' 
            onClick={() => goToCategory('following')}/></h1>
          </div>
          <div className="wrapper1">

            {
              followingPosts.map(p => (
                <Post key={p.postID} post={p}/>
              ))
            }
          </div>
        </>
      }
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