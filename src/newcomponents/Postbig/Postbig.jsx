import React from 'react'
import "./Postbig.css"
import { useParams } from 'react-router-dom'
import Message from '../Message/Message'
import { AiFillLike,AiOutlineDownload } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect} from "react"
import Modal from "../Modal/Modal"
import Modal8 from '../Modal8/Modal8';

import axios from 'axios';
import Modal9 from '../Modal9/Modal9';

function Postbig({ closeModal}) {
  const postId = useParams()['id']

  const [like,setLike] = useState("")
  const [isLiked,setIsLiked] = useState(false)

  const [commentVal, setCommentVal] = useState("")
  const [commentList, setCommentList] = useState([])

  const [postData, setPostData] = useState({})
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [memberList, setMemberList] = useState([])
  const [uploader, setUploader] = useState([])

  const handleBoxChange = (e) => {
    console.log(e.target.value)
    setCommentVal(e.target.value)
  }

  const likeHandler = async ()=>{
    const req = {
      'userID' : String(getCookie('userID')),
      'postID' : postData.postID,
    }

    await axios.post('http://localhost:8000/likePost/', req).then((res) => {
      console.log(res)
      setLike(res.data['likes'])
    });
  }

  const sendComment = async () => {
    if(commentVal != "") {
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
            'postID': postId,
            'info': commentVal,
            'createdAt': res.data['createdAt']
          })
          setCommentList(newCommentList)
        }
      })
      setCommentVal("")
    }
  }

  useEffect(() => {
    axios.get("http://localhost:8000/getPost/" + postId + '/' + getCookie('userID'))
      .then((res) => {
        setPostData(res.data['postData'])
        setLike(res.data['postData']['likes'])

        console.log(res.data['postData']['comments'])
        setCommentList(res.data['postData']['comments'].slice())
        setMemberList(res.data['postData']['memberList'])

        if(res.data['postData']['memberList'].length == 1)
          setUploader(res.data['postData']['memberList'][0])

        if((res.data['postData'].likedBy).includes(String(getCookie('userID')))) {
          setIsLiked(true)
        }

        console.log(res.data['postData'].comments)
      })
  }, [])

  return (
    <div>
      <div className="bodyyy">
        <div className="postbig-container">
          
          <div className="postimg-container">
            <div className="postbig-cropper">
            <img src={postData['imageVal']} alt="" className='postimage'/>
            </div>
          </div>

          <div className="post-bigdet">
            <div className="post-bigdetails">
              <div className="profile-post">
                <div className="profilepost-img">
                  <img src={uploader.profilePicture} alt="" className='ppimg'/>
                  <h4 className="ppname">{uploader.username}</h4>
                  <button className="remix-btn">Remixed Image</button>
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
                      <img src={comment.profilePicture} alt="" className='pcimg'/>
                      <h4 className='comment-username'>{comment.username}</h4>
                      <p className='pctext'>{comment.info} </p>
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="comment-info">
                <div className="icons">
                  <div className="like1">
                    <AiFillLike className='icon-info' onClick={likeHandler}/>
                    <span className='likenumber'>{like}</span>
                  </div>
                  <FaShare  className='icon-info' onClick={() => setOpenModal(true)}/>
                  <h5 className='remix'>Remix</h5>
                  <div class="dropdown-block2">
                  <BsThreeDots className='three-dots2'  class="dropdowns2"/>
                  <div class="dropdown-content2">
                        <button class="dropdown-text2" onClick={() => { setOpenModal1(true);}}>Report Image</button>
                        
                      </div>
                      </div>
                </div>
              </div>
            </div>
          
            <div className="comment">
              <img src="/images/avatar.png" alt="" className='pcimg1'/>
              <textarea
                  className="chatMessageInput1"
                  placeholder=" Add a comment"
                  value={commentVal}
                  onChange={handleBoxChange}
              ></textarea>

              <button className="chatSubmitButton1" onClick={sendComment}>
                <span className='send' >
                  Send
                </span>
              </button>
            </div>
          </div>
        </div>
        {openModal && <Modal8 closeModal={setOpenModal} />}  
        
      </div>
      {openModal1 && <Modal9 closeModal1={setOpenModal1} />}  
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