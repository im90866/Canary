import React, {useState, useEffect} from 'react'
import Topbar from '../Topbar/Topbar'
import Sidebar from '../Sidebar/Sidebar'
import { Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import "./Profileothers.css"
import { BsThreeDots } from "react-icons/bs";
import Modal8 from '../Modal8/Modal8'
import Modal10 from '../Modal10/Modal10'
import Modal11 from '../Modal11/Modal11'
function Profileothers() {
  const userID = useParams()['userID']
  const [PFP, setPFP] = useState("")
  const [images, setImages] = useState([])
  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState(0)
  const [username, setUsername] = useState("")
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const navigate = useNavigate()

  const messageUser = async() => {
    const req = {
      'userID': getCookie('userID'),
      'otherPersonsID': userID
    }

    await axios.post('http://localhost:8000/checkChat/', req).then((res) => {
      console.log(res)
    });

    navigate('/chats')
  }

  const follow = async () => {
    const req = {
      'userID': getCookie('userID'),
      'otherUserID': userID
    }

    await axios.post('http://localhost:8000/followUser/', req).then((res) => {
      if(res.data['success']){
        if(res.data['follow']) {
          setFollowing(true)
          setFollowers(followers + 1)
        }
        else {
          setFollowing(false)
          setFollowers(followers - 1)
        }
      }
    });

  }
  
  useEffect(() => {
    setPFP("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAADRCAMAAAAquaQNAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BMQEAAADCoPVP7WULoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuxZIAAeHuCGgAAAAASUVORK5CYII=")

    if(userID == String(getCookie('userID')))
      navigate('/profile')

    axios.get('http://localhost:8000/getUsername/'+ userID).then((res) => {
      setUsername(res.data['username'])
      setFollowers(res.data['followers'])
    });

    axios.get("http://localhost:8000/getProfilePicture/" + userID).then((res) => {
      if(res.data["success"]) {
        setPFP(res.data['imageString'])
      }
    })

    axios.get("http://localhost:8000/getProfileFeed/" + userID).then((res) => {
      if(res.data["success"]) {
        setImages(res.data['postData'])
        console.log(res.data)
      }
    })
  }, [])

  return (
    <div>
        <body className="profilecc">
    
      <div className="profile-container">
      
        <div className='profile-image-cropper'>
          <img src={PFP} className="profile-image"/>
        </div>

        <h1 className="profile-user2">{username}</h1>
        <div className="follower-info">
             <h1 className='follow-numbers'>{followers}</h1>
             <h1 className='followers'>Followers</h1>
         </div>
        <div className="btn-class2">
        <button className="editp1" onClick={() => {messageUser()}}>Message</button>
        <button className="editp1" onClick={() => follow()}>Follow</button>
        <div class="dropdown-block3">
        <BsThreeDots className='three-dots4' class="dropdowns3" />
        <div class="dropdown-content3">
                        <button class="dropdown-text3" onClick={() => { setOpenModal2(true);}}>Report</button><br></br>
                        <button class="dropdown-text3" onClick={() => { setOpenModal(true);}}>Block</button>
                      </div>
                 
                    </div>
        </div>

        <div className="wrapper2">
          {
            images.map(image => (
            <div className="card1">
              <div className="card__body1">
                <div className="img1">
                  <img src={image.imageVal} className="card__image" alt=""/>    
                </div>
              </div>
            </div>
          ))} 
        </div> 
   
        {openModal2 && <Modal11 closeModal={setOpenModal2} />}  
        {openModal && <Modal10 closeModal={setOpenModal} />}  
      </div>
  

      </body>
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

export default Profileothers