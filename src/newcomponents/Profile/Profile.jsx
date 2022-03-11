import React, {useState, useEffect} from 'react'
import Topbar from '../Topbar/Topbar'
import Sidebar from '../Sidebar/Sidebar'
import "./Profile.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

function Profile() {
  const [username, setUsername] = useState("")
  const [PFP, setPFP] = useState("")
 
  useEffect(() => {
    setUsername(String(getCookie('username')))
    setPFP("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAADRCAMAAAAquaQNAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BMQEAAADCoPVP7WULoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuxZIAAeHuCGgAAAAASUVORK5CYII=")

    axios.get("http://localhost:8000/getProfilePicture/" + String(getCookie('username'))).then((res) => {
      if(res.data["success"]) {
        setPFP(res.data['imageString'])
      }
    })
  }, [])

  return (
    <div>
      <Topbar/>
     
        
      <Sidebar/>
      <div className="profile-container">
  
    
         <div className='profile-image-cropper'>
            <img src={PFP} className="profile-image"/>
          </div>
          <h1 className="profile-user">{username}</h1>
          <Link to="/settings"><button className="editp">Edit Profile</button></Link>
      
        <div className="post-info">
          <h2 className="collaborations"><Link to="/profile/collaborations">Collaborations</Link></h2>
          <h2 className="posts1"><Link to="/profile/profileposts">Posts</Link></h2>
      
       </div>
  

         <div className="wrapper">
   <div className="card1">
            <div className="card__body1">
              <div className="img1">
                <img src="https://cdn.pixabay.com/photo/2022/01/11/14/09/bird-6930700__340.jpg" className="card__image" alt=""/>    
              </div>
            </div>
          </div>

        <div className="card1">
          <div className="card__body1">
            <div className="img1">
              <img src="https://cdn.pixabay.com/photo/2022/01/11/14/09/bird-6930700__340.jpg" className="card__image" alt=""/>    
            </div>
          </div>
        </div> 

        <div className="card1">
          <div className="card__body1">
            <div className="img1">
              <img src="https://cdn.pixabay.com/photo/2022/01/11/14/09/bird-6930700__340.jpg" className="card__image" alt=""/>    
            </div>
          </div>
        </div>
        <div className="card1">
          <div className="card__body1">
            <div className="img1">
              <img src="https://cdn.pixabay.com/photo/2022/01/11/14/09/bird-6930700__340.jpg" className="card__image" alt=""/>    
            </div>
          </div>
        </div>
        <div className="card1">
          <div className="card__body1">
            <div className="img1">
              <img src="https://cdn.pixabay.com/photo/2022/01/11/14/09/bird-6930700__340.jpg" className="card__image" alt=""/>    
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
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
export default Profile