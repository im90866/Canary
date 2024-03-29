import "./Topbar.css";
import { FaSearch, FaHome } from 'react-icons/fa'
import { RiChatSmile2Fill, RiContactsBookLine } from "react-icons/ri"
import { BsFillPlusCircleFill, BsPlusCircle } from "react-icons/bs"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import { GoThreeBars } from 'react-icons/go';
import { useState, useEffect, useRef, createContext } from "react"
import { MdExplore, MdOutlineEmail, MdOutlineNotificationsNone, MdSettings } from "react-icons/md"
import axios from "axios"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { IconContext } from 'react-icons';
import { IoIosNotificationsOutline, IoIosArrowForward } from "react-icons/io";
import Modal4 from "../Modal4/Modal4";
import ListGroup from 'react-bootstrap/ListGroup'
import Res from './Res'
import { useMediaQuery } from 'react-responsive';
import Sidebar from "../Sidebar/Sidebar";
import Sidebar2 from "../Sidebar2/Sidebar2";
import { AiOutlineMail } from "react-icons/ai"
import { GrFormClose } from "react-icons/gr"
import { BsCheck } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io"
import Modal11 from "../Modal11/Modal11";
import Modal12 from "../Modal12/Modal12";
import Modal16 from "../Modal16/Modal16";

const isMobileContext = createContext()

function Topbar(prop) {
  const navigate = useNavigate()

  const cache = prop.cache
  const setCache = prop.setCache

  const [openModal, setOpenModal] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 800px)` })
  const [showSidebar, setShowSidebar] = useState(false)
  const location = useLocation()
  const [check, setCheck] = useState()

  const [searchField, setSearchField] = useState("")
  const [searchRes, setSearchRes] = useState([])

  const [notifList, setNotifList] = useState([])
  const [inviteList, setInviteList] = useState([])

  const [isSearching, setIsSearching] = useState(false)

  const [isAdmin, setIsAdmin] = useState(false)

  const [PFP, setPFP] = useState("")

  const [showReq, setShowReq] = useState(false)

  const listRef = useRef()
  const inputRef = useRef()
  const notifRef = useRef()

  const search = async () => {
    setIsSearching(true)

    if (searchField == "")
      setSearchRes([])
    else {
      const response = await axios.get("http://localhost:8000/search/" + searchField)
        .then((res) => {
          setIsSearching(false)
          if (res.data["success"]) {
            // return (res.data['results'])
            setSearchRes(res.data['results'])
          }
          else {
            console.log("Error: " + res.data["error"])
            setSearchRes([])
          }
        })
    }
  }

  const acceptRequest = (projectId) => {
    const request = {
      'userID': getCookie('userID'),
      'projectID': projectId,
      'interact': 'accept'
    }

    axios.post("http://localhost:8000/interactInvite/", request).then((res) => {
      setOpenModal(false)
    })

  }

  const rejectRequest = (projectId) => {
    const request = {
      'userID': getCookie('userID'),
      'projectID': projectId,
      'interact': 'reject'
    }

    axios.post("http://localhost:8000/interactInvite/", request).then((res) => {
      setOpenModal(false)
    })
  }

  const openClose = () => {
    if (!openModal)
      setOpenModal(true)
    else {
      setOpenModal(false)
      setShowReq(false)
    }
  }

  const goToPost = (type, postID) => {
    if (type == 'comment' || type == 'like') {
      setOpenModal(false)
      navigate('/post/' + postID)
    }
  }

  useEffect(() => {
    if (!('topbarProfilePicture' in cache)) {
      axios.get("http://localhost:8000/getProfilePicture/" + String(getCookie('userID'))).then((res) => {
        if (res.data["success"]) {
          cache['topbarProfilePicture'] = res.data['imageString']
          setCache(cache)

          setPFP(res.data['imageString'])
        }
      })
    }
    else
      setPFP(cache['topbarProfilePicture'])

    axios.get("http://localhost:8000/getNotifications/" + String(getCookie('userID'))).then((res) => {
      let notifList = res.data['notificationsList'].slice()
      let requestList = res.data['inviteList'].slice()

      console.log(res.data['notificationsList'])

      setNotifList(notifList)
      setInviteList(requestList)
      setIsAdmin(res.data['isAdmin'])

      axios.get("http://localhost:8000/isAdmin/" + getCookie('userID'))
        .then((res) => {
          console.log(res.data['isAdmin'])
          setIsAdmin(res.data['isAdmin'])
        })
    })

    // notifRef.current.addEventListener('click', (e) => {
    //   setOpenModal(true)
    // })

    inputRef.current.addEventListener('click', (e) => {
      e.stopPropagation()
      listRef.current.style.display = 'grid'
      // setIsSearching(true)

    })

    document.addEventListener('click', (e) => {
      listRef.current.style.display = 'none'
      // setOpenModal(false)
      if (openModal)
        setOpenModal(false)
      if (openModal3)
        setOpenModal3(false)
      if (openModal4)
        setOpenModal4(false)
      if (showSidebar)
        setShowSidebar(false)

    })

    if (openModal3) {

    } else {
      document.body.style.filter = 'blur(0px) grayscale(0%)'
    }

    if (location.pathname.includes("/workspace"))
      setCheck(location.pathname.includes("/workspace"))
    else if (location.pathname.includes("/teamchats"))
      setCheck(location.pathname.includes("/teamchats"))
    else if (location.pathname.includes("/projectmembers"))
      setCheck(location.pathname.includes("/projectmembers"))
    else if (location.pathname.includes("/projectsettings"))
      setCheck(location.pathname.includes("/projectsettings"))
    else
      setCheck(false)

  }, [location.pathname, openModal3, openModal, showSidebar])


  return (
    <>
      <div className="topbarContainer">

        <div className="topbarLeft">
          {
            isMobile
              ?
              <GoThreeBars className="threeBars" onClick={(e) => {setShowSidebar(!showSidebar); e.stopPropagation()}} />
              :
              <span className="logo"> <Link to="/home">Canary</Link></span>
          }
        </div>



        <div className="topbarCenter">
          <div className="searchbar">
            <FaSearch className="searchIcon" />
            <input
              placeholder="Search other users"
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
                        key={index}
                        onClick={(e) => {
                          inputRef.current.value = res.username;
                          axios.get('http://localhost:8000/getUserID/' + res.username).then((response) => {
                            navigate('profile/' + response.data['userID'])
                            window.location.reload();
                          });
                        }}
                        className="list-group-item"
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
            {
              isAdmin &&
              <div className="topbarIconItem">
                <AiOutlineMail className="icons13"
                  onClick={(e) => {
                    setOpenModal4(!openModal4);
                    e.stopPropagation()
                    if (openModal)
                      setOpenModal(false)
                  }} />
              </div>
            }

            <div className="topbarIconItem">
              <BsPlusCircle className="icons12"
                onClick={(e) => { setOpenModal3(!openModal3); e.stopPropagation() }} />
            </div>
            <div className="topbarIconItem">
              <IoIosNotificationsOutline className="noti-icon"
                onClick={(e) => {
                  openClose();
                  e.stopPropagation()
                  if (openModal4)
                    setOpenModal4(false)
                }}
              />
              <div ref={notifRef}>
                {
                  openModal
                  &&
                  <div >
                    <div className="modalBackground2">
                      <div className="modalContainer4" onClick={e => e.stopPropagation()}>

                        {
                          !showReq
                            ?
                            <>
                              <div className="notifications">
                                {/* <div className="titleCloseBtn2">
                                  <button className='cross'
                                    >
                                    x
                                  </button>
                                </div> */}
                                <div></div>
                                <h3>Notifications</h3>
                                <GrFormClose onClick={() => { openClose() }} />
                              </div>
                              {/* <br></br> */}
                              <div className="requests" style={{ justifyContent: 'space-between' }} onClick={() => setShowReq(!showReq)}>
                                <p>Requests</p> <IoIosArrowForward onClick={() => setShowReq(!showReq)} />
                              </div>
                              <ul className="notifications-2">
                                {
                                  notifList.map(notif => (
                                    <li className="notificationslist" onClick={() => goToPost(notif.type, notif.onPostID)}>
                                      <img src={notif.imageVal} alt="" className='profile-pic' />
                                      <div className="notif-text">{notif.info}</div>
                                    </li>
                                  ))
                                }
                              </ul>
                            </>
                            :
                            <>
                              <div className="requests2">
                                <IoMdArrowBack onClick={() => setShowReq(!showReq)} />
                                <h3>Requests</h3>
                                <div></div>
                              </div>

                              <ul className="notifications-2">
                                {
                                  inviteList.map(notif => (
                                    <li className="notificationslist">
                                      <img src="/images/avatar.png" alt="" className='profile-pic' />
                                      <div className="notif-text">{notif.info}</div>
                                      <GrFormClose onClick={() => rejectRequest(notif.projectID)} />
                                      <BsCheck onClick={() => acceptRequest(notif.projectID)} />
                                    </li>
                                  ))
                                }
                              </ul>
                            </>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
              {/* <span className="topbarIconBadge">1</span> */}
            </div>

            <div className="topbarIconItem">
              <div className="topbarImg-cropper">
                <Link to="/profile"><img src={PFP} alt="" className="topbarImg" /> </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
      {
        !isMobile
          ?
          !check
            ?
            <>
              <Sidebar
                isMobile={isMobile}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                cache={cache}
                setCache={setCache}
              />
              {
              }
            </>
            :
            <Sidebar2 showSidebar={showSidebar} cache={cache} setCache={setCache} />
          :
          showSidebar
            ?
            !check
              ?
              <>
                <Sidebar
                
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                />
              </>
              :
              <Sidebar2 
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              />
            :
            null
      }
      {openModal3 && <Modal12 closeModal={setOpenModal3} />}
      {openModal4 && <Modal16 closeModal={setOpenModal4} />}
    </>
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
  if (val == "")
    return false
  else
    return true
}


export default Topbar
export { isMobileContext }