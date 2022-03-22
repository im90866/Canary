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

function Postbig({ closeModal}) {
  const postId = useParams()['id']

  const [like,setLike] = useState(post['post']['likes'])
  const [isLiked,setIsLiked] = useState(false)
  const [postData, setPostData] = useState({})
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/getPost/" + postId + '/' + getCookie('userID'))
      .then((res) => {
        console.log(res.data['postData'])
        setPostData(res.data['postData'])
      })
  }, [])

  return (
    <div>
      <div className="bodyyy">
        <div className="postbig-container">
          
          <div className="postimg-container">
            <img src={postData['imageVal']} alt="" className='postimage'/>
          </div>

          <div className="post-bigdet">
            <div className="post-bigdetails">
              <div className="profile-post">
                <div className="profilepost-img">
                  <img src="/images/avatar.png" alt="" className='ppimg'/>
                  <h4 className="ppname">Newfez</h4>
                </div>
                
                <div className="captions">
                  <p className='cap'>{postData.caption}</p>
                </div>
              </div>

              <div className="comment-containber">
                <ul className="comment-list">
                  <li className="commentli">
                    <img src="/images/avatar.png" alt="" className='pcimg'/>
                    <p className='pctext'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                  </li>
                </ul>
              </div>
              
              <div className="comment-info">
                <div className="icons">
                  <div className="like1">
                    <AiFillLike className='icon-info'/>
                    <span className='likenumber'>{postData.likes}</span>
                  </div>
                  <FaShare  className='icon-info' onClick={() => setOpenModal(true)}/>
                  <h5 className='remix'>Remix</h5>
                  <BsThreeDots className='three-dots2'/>
                </div>
              </div>
            </div>
          
            <div className="comment">
              <img src="/images/avatar.png" alt="" className='pcimg1'/>
              <textarea
                  className="chatMessageInput1"
                  placeholder="write something..."
              ></textarea>

              <button className="chatSubmitButton1" >
                <span className='send'>
                  Send
                </span>
              </button>
            </div>
          </div>
        </div>
        {openModal && <Modal8 closeModal={setOpenModal} />}  
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


export default Postbig