import React from 'react'
import "./Postbig.css"
import { useParams, useNavigate } from 'react-router-dom'
import Message from '../Message/Message'
import { AiFillLike, AiOutlineDownload } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect } from "react"
import Modal from "../Modal/Modal"
import Modal2 from "../Modal2/Modal2"
import Modal8 from '../Modal8/Modal8';

import axios from 'axios';
import Modal9 from '../Modal9/Modal9';
import Res from '../Topbar/Res';

function Postbig({ closeModal }) {
  const postId = useParams()['id']
  const navigate = useNavigate()

  const [like, setLike] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  const [username, setUsername] = useState("")

  const [commentVal, setCommentVal] = useState("")
  const [commentList, setCommentList] = useState([])

  const [postData, setPostData] = useState({})
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [memberList, setMemberList] = useState([])
  const [uploader, setUploader] = useState([])

  const [remixID, setRemixID] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const handleBoxChange = (e) => {
    console.log(e.target.value)
    setCommentVal(e.target.value)
  }

  const gotToRemix = () => {
    console.log(remixID)
    navigate('/post/' + remixID)
  }

  const likeHandler = async () => {
    const req = {
      'userID': String(getCookie('userID')),
      'postID': postData.postID,
    }

    await axios.post('http://localhost:8000/likePost/', req).then((res) => {
      console.log(res)
      setLike(res.data['likes'])
      setIsLiked(!isLiked)
    });
  }

  const goToProfile = async () => {
    await axios.get('http://localhost:8000/getUserID/' + uploader.username).then((res) => {
      console.log(username)
      navigate('/profile' + '/' + res.data['userID'])
    });
  }

  const sendComment = async () => {
    if (commentVal != "") {
      const req = {
        'userID': getCookie('userID'),
        'postID': postId,
        'info': commentVal,
      }

      await axios.post("http://localhost:8000/sendComment/", req).then((res) => {
        if (res.data["error"]) {
          console.log(res.data['error'])
        }
        else {
          let newCommentList = commentList.slice()
          newCommentList.push({
            'userID': getCookie('userID'),
            'username': username,
            'info': commentVal,
            'createdAt': res.data['createdAt']
          })
          setCommentList(newCommentList)
        }
      })
      setCommentVal("")
    }
  }

  const remixPost = async () => {
    const req = {
      'userID': getCookie('userID'),
      'postID': postId,
    }

    await axios.post("http://localhost:8000/remixPost/", req).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
      else {
        navigate('/project')
      }
    })
  }

  const [threedots, setThreeDots] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:8000/getPost/" + postId + '/' + getCookie('userID'))
      .then((res) => {
        setPostData(res.data['postData'])
        setLike(res.data['postData']['likes'])

        setCommentList(res.data['postData']['comments'].slice())
        setMemberList(res.data['postData']['memberList'])

        if (res.data['postData']['memberList'].length == 1)
          setUploader(res.data['postData']['memberList'][0])

        if ((res.data['postData'].likedBy).includes(String(getCookie('userID')))) {
          setIsLiked(true)
        }

        if (res.data['postData']['remixPostID'] != undefined) {
          setRemixID(res.data['postData']['remixPostID'])
        }

        if (res.data['postData']['isAdmin']) {
          setIsAdmin(true)
        }

        const req = {
          'userID': getCookie('userID'),
          'postID': postId,
        }

        axios.post("http://localhost:8000/likeStatus/", req)
          .then((res) => {
            if (res.data['success']) {
              setIsLiked(res.data['liked'])
            }
          })

        axios.get("http://localhost:8000/getUsername/" + getCookie('userID'))
          .then((res) => {
            if (res.data['success']) {
              setUsername(res.data['username'])
            }
          })


      })

    document.addEventListener('click', (e) => {
      if (openModal1)
        setOpenModal1(false)
      if (openModal)
        setOpenModal(false)
      if (openModal2)
        setOpenModal2(false)
      if(threedots)
        setThreeDots(false)
    })

    if (openModal1 || openModal || openModal2) {
      if(threedots)
        setThreeDots(false)
    } else {
      document.getElementById('bodyyy').style.filter = 'blur(0px) grayscale(0%)'
    }
  }, [openModal1, openModal, openModal2, threedots])

  return (
    <div>
      <div className="bodyyy" id='bodyyy'>
        <div className="postbig-container">

          <div className="postimg-container">
            <div className="postbig-cropper">
              <img src={postData['imageVal']} alt="" className='postimage' />
            </div>
          </div>

          <div className="post-bigdet">
            <div className="post-bigdetails">
              <div className="profile-post">
                <div className="profilepost-img" onClick={goToProfile}>
                  <img src={uploader.profilePicture} alt="" className='ppimg'/>
                  <h4 className="ppname">{uploader.username}</h4>
                  {
                    remixID != "" ?
                      <button className="remix-btn" onClick={gotToRemix}>Remixed</button>
                      :
                      <h1></h1>
                  }
                </div>

                <div className="captions">
                  <p className='cap'>{postData.caption}</p>
                </div>
              </div>

              <div className="comment-containber">
                <ul className="comment-list">
                  {
                    commentList.map(comment =>
                      <li className="commentli">
                        <img src={comment.profilePicture} alt="" className='pcimg' />
                        <div className="comms">
                          <h4 className='comment-username'>{comment.username}</h4>
                          <p className='pctext12'>{comment.info} </p>
                        </div>
                      </li>
                    )}
                </ul>
              </div>

              <div className="comment-info">
                <div className="icons">
                  <div className="like1">
                    {
                      isLiked ?
                        <AiFillLike className='icon-info-like-active' onClick={likeHandler} />
                        :
                        <AiFillLike className='icon-info-like' onClick={likeHandler} />
                    }

                    <span className='likenumber'>{like}</span>
                  </div>
                  <FaShare className='icon-info' onClick={(e) => { setOpenModal(true); e.stopPropagation() }} />
                  <h5 className='remix' onClick={remixPost}>Remix</h5>
                  <div class="dropdown-block2">
                    <BsThreeDots className='three-dots2' class="dropdowns2" onClick={(e) => {setThreeDots(!threedots); e.stopPropagation()}}/>
                    {
                      threedots
                        ?
                        <div class="dropdown-content2" style={{display:'block'}}>
                          <button class="dropdown-text2" onClick={(e) => { setOpenModal1(true); e.stopPropagation() }}>Report Image</button>
                          {
                            isAdmin && <button class="dropdown-text2" onClick={(e) => { setOpenModal2(true); e.stopPropagation() }}>Delete Image</button>
                          }
                        </div>
                        :
                        null
                    }
                  </div>

                </div>
              </div>
            </div>

            <div className="comment">
              <textarea
                className="chatMessageInput1"
                placeholder=" Add a comment"
                value={commentVal}
                onChange={handleBoxChange}
              ></textarea>

              <button className="chatSubmitButton4" onClick={sendComment}>
                <span className='send' >
                  Send
                </span>
              </button>
            </div>
          </div>

        </div>


      </div>

      {openModal2 && <Modal2 type="post" postID={postId} closeModal={setOpenModal2} />}
      {openModal && <Modal8 closeModal={setOpenModal} />}
      {openModal1 && <Modal9 postID={postId} closeModal1={setOpenModal1} />}
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


export default Postbig