import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Summary.css"

function Summary() {
  const [username, setUsername] = useState("")

  const [userCount, setUserCount] = useState("")
  const [postCount, setPostCount] = useState("")
  const [projCount, setProjCount] = useState("")
  const [remixCount, setRemixCount] = useState("")

  useEffect(() => {
    axios.get("http://localhost:8000/getSummary/")
      .then((res) => {
        setUsername(getCookie('username'))

        setUserCount(res.data['usersCount'])
        setPostCount(res.data['postCount'])
        setProjCount(res.data['projCount'])
        setRemixCount(res.data['remixCount'])
      })
  })

  return (
    <div>
           <div className="bodyyy">
        <div className="modalBackground6">
          <div className="modalContainer6">
            <div className="titleCloseBtn6">
           </div>

          <div className="title6">
            <h1 className="code-conformation">Summary Report</h1>
            <div className="use12">
             <h1 className='use3'>Username :</h1>
             <h1 className='use4'>{username}</h1>
             </div>
             <div className="use12">
             <h1 className='use3'>Number of users :</h1>
             <h1 className='use4'>{userCount}</h1>
             </div>
             <div className="use12">
             <h1 className='use3'>Number of posts:</h1>
             <h1 className='use4'>{postCount}</h1>
             </div>
             <div className="use12">
             <h1 className='use3'>Number of projects:</h1>
             <h1 className='use4'>{projCount}</h1>
             </div>
             <div className="use12">
             <h1 className='use3'>Number of remixes:</h1>
             <h1 className='use4'>{remixCount}</h1>
             </div>

          </div>
          </div>
        </div>
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

export default Summary