import React, {useState, useEffect} from 'react'
import Topbar from '../Topbar/Topbar'
import Sidebar from '../Sidebar/Sidebar'
import { Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import "./Blocked.css"
import { BsThreeDots } from "react-icons/bs";
import Modal8 from '../Modal8/Modal8'
import Modal10 from '../Modal10/Modal10'
import Modal11 from '../Modal11/Modal11'
import {AiOutlineLock} from "react-icons/ai";
import Modal17 from '../Modal17/Modal17'
function BlockedAcc() {
  const userID = useParams()['userID']
  const [PFP, setPFP] = useState("")
  const [images, setImages] = useState([])
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
  
  useEffect(() => {
    setPFP("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAADRCAMAAAAquaQNAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BMQEAAADCoPVP7WULoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuxZIAAeHuCGgAAAAASUVORK5CYII=")

    if(userID == String(getCookie('userID')))
      navigate('/profile')

    axios.get('http://localhost:8000/getUsername/'+ userID).then((res) => {
      setUsername(res.data['username'])
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
             <h1 className='follow-numbers'>0</h1>
             <h1 className='followers'>Followers</h1>
         </div>
        <div className="btn-class2">
        <button className="editp1" onClick={() => {messageUser()}}>Message</button>
        <button className="editp1">Follow</button>
        <div class="dropdown-block3">
        <BsThreeDots className='three-dots4' class="dropdowns3" />
        <div class="dropdown-content3">
                        <button class="dropdown-text3" onClick={() => { setOpenModal2(true);}}>Report</button><br></br>
                        <button class="dropdown-text3" onClick={() => { setOpenModal(true);}}>Unblock</button>
                      </div>
              
                    </div>
        </div>

     <div className="acc-private">
         <AiOutlineLock className="lock"/>
         <h1 className='this-acc'>This Account Is Private</h1>
         <p className='follow-acc'>Follow this account to see their pictures</p>
     </div>
   
        {openModal2 && <Modal11 closeModal={setOpenModal2} />}  
        {openModal && <Modal17 closeModal={setOpenModal} />}  
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

export default BlockedAcc