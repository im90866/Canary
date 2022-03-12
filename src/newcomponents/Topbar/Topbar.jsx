import "./Topbar.css";
import { FaSearch, FaHome } from 'react-icons/fa'
import { RiChatSmile2Fill, RiContactsBookLine } from "react-icons/ri"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { Link, useNavigate} from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import { useState, useEffect, useRef } from "react"
import { MdExplore, MdOutlineNotificationsNone, MdSettings } from "react-icons/md"
import axios from "axios"

import { IconContext } from 'react-icons';
import { IoIosNotificationsOutline } from "react-icons/io";
import Modal4 from "../Modal4/Modal4";
import ListGroup from 'react-bootstrap/ListGroup'
import Res from './Res'

function Topbar() {
  const navigate = useNavigate()

  const [openModal, setOpenModal] = useState(false);

  const [searchField, setSearchField] = useState("")
  const [searchRes, setSearchRes] = useState([])

  const [isSearching, setIsSearching] = useState(false)

  const [PFP, setPFP] = useState("")

  const listRef = useRef()
  const inputRef = useRef()
  const notifRef = useRef()

  const search = async () => {
    setIsSearching(true)
    console.log(searchField)
    console.log(searchRes.length)

    if(searchField == "")
      setSearchRes([])
    else {
      const response = await axios.get("http://localhost:8000/search/" + searchField)
        .then((res) => {
          setIsSearching(false)
          if (res.data["success"]) {
            console.log("working")
            console.log(res)
            // return (res.data['results'])
            setSearchRes(res.data['results'])
          }
          else {
            console.log("Error: " + res.data["error"])
            setSearchRes([])
          }
        })
      console.log(searchRes)
      console.log(response)
    }
  }

  const openClose = () => {
    if (!openModal)
      setOpenModal(true)
    else
      setOpenModal(false)

    console.log(openModal)
  }

  useEffect(() => {
    setPFP("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAADRCAMAAAAquaQNAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BMQEAAADCoPVP7WULoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuxZIAAeHuCGgAAAAASUVORK5CYII=")

    axios.get("http://localhost:8000/getProfilePicture/" + String(getCookie('username'))).then((res) => {
      if (res.data["success"]) {
        setPFP(res.data['imageString'])
      }
    })

    // notifRef.current.addEventListener('click', (e) => {
    //   setOpenModal(true)
    // })

    inputRef.current.addEventListener('click', (e) => {
      e.stopPropagation()
      listRef.current.style.display = 'flex'
      // search()

    })

    document.addEventListener('click', (e) => {
      listRef.current.style.display = 'none'
      // setOpenModal(false)
    })
  }, [])

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"> <Link to="/home">Canary</Link></span>
      </div>



      <div className="topbarCenter">
        <div className="searchbar">
          <FaSearch className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            value={searchField}
            onKeyUp={() => search()}
            onChange={e => setSearchField(e.target.value)}
            ref={inputRef}
          />
          <div id="results" className="results" ref={listRef}>
            {
              searchRes.length > 0
                ?
                searchRes.map((res, index) => {
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={(e) => {
                        inputRef.current.value = res.username;
                        
                        navigate('/profile/' + res.username)
                        window.location.reload();
                      }}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="search-image-cropper">
                        <img style={{ width: '30px', height: '25px' }} className="search-image" src={res.profilePictureID} />
                      </div>
                      &nbsp;
                      &nbsp;
                      {res.username}
                    </button>
                  )
                })
                :
                  isNotEmpty(searchField) && !isSearching &&
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                  >
                    No Results Found
                  </button>
                
            }
          </div>

        </div>
      </div>



      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <IoIosNotificationsOutline
            onClick={() => openClose()}
            />
            <div ref={notifRef}>
              {
                openModal
                &&
                <div >
                  <div className="modalBackground2">
                    <div className="modalContainer4">
                      <div className="titleCloseBtn2">
                        <button className='cross'
                          onClick={() => {
                            openClose();
                          }}
                        >
                          x
                        </button>
                      </div>
                      <h1 className="notifications">Notifications</h1>

                      <ul className="notifications-2">
                        <li className="notificationslist">
                          <img src="/images/avatar.png" alt="" className='profile-pic' />
                          <div className="notif-text">User1 liked your post</div>
                        </li>
                        <li className="notificationslist">
                          <img src="/images/avatar.png" alt="" className='profile-pic' />
                          <div className="notif-text">User1 liked your post</div>
                        </li>
                        <li className="notificationslist">
                          <img src="/images/avatar.png" alt="" className='profile-pic' />
                          <div className="notif-text">User1 liked your post</div>
                        </li>
                        <li className="notificationslist">
                          <img src="/images/avatar.png" alt="" className='profile-pic' />
                          <div className="notif-text">User1 liked your post</div>
                        </li>
                        <li className="notificationslist">
                          <img src="/images/avatar.png" alt="" className='profile-pic' />
                          <div className="notif-text">User1 liked your post</div>
                        </li>
                        <li className="notificationslist">
                          <img src="/images/avatar.png" alt="" className='profile-pic' />
                          <div className="notif-text">User1 liked your post</div>
                        </li>
                      </ul>

                    </div>
                  </div>
                </div>
              }
            </div>
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <div className="topbarImg-cropper">
              <Link to="/profile"><img src={PFP} alt="" className="topbarImg" /> </Link>
            </div>
          </div>

        </div>

      </div>
      {/* {openModal && <Modal4 closeModal={setOpenModal} />} */}
    </div>

  );
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


function isNotEmpty(val) {
  if(val == "")
    return false
  else 
    return true
}


export default Topbar