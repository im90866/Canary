import React from 'react'
import "./Postbig.css"
import { Link } from 'react-router-dom'
import Message from '../Message/Message'
import { AiFillLike,AiOutlineDownload } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
function Postbig() {
  return (
    <div>
      <div className="bodyyy">
      <div className="postbig-container">
        <div className="postimg-container">
          <img src="https://cdn.pixabay.com/photo/2022/01/11/14/09/bird-6930700__340.jpg" alt="" className='postimage'/>
          </div>
          <div className="post-bigdetails">
          <div className="profile-post">
           <div className="profilepost-img">
             <img src="/images/avatar.png" alt="" className='ppimg'/>
             <h4 className="ppname">Newfez</h4>
             </div>
             <div className="captions">
               <p className='cap'>Lorem ipsum dolor sit amet consectetu.</p>
             </div>
            </div>
            <div className="comment-containber">
<ul className="comment-list">
  <li className="commentli">
    <img src="/images/avatar.png" alt="" className='pcimg'/>
    <p className='pctext'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
    </li>
    <li className="commentli">
    <img src="/images/avatar.png" alt="" className='pcimg'/>
    <p className='pctext'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
    </li>
    <li className="commentli">
    <img src="/images/avatar.png" alt="" className='pcimg'/>
    <p className='pctext'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
    </li>
    <li className="commentli">
    <img src="/images/avatar.png" alt="" className='pcimg'/>
    <p className='pctext'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
    </li>
    <li className="commentli">
    <img src="/images/avatar.png" alt="" className='pcimg'/>
    <p className='pctext'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
    </li>
    <li className="commentli">
    <img src="/images/avatar.png" alt="" className='pcimg'/>
    <p className='pctext'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
    </li>
    <li className="commentli">
    <img src="/images/avatar.png" alt="" className='pcimg'/>
    <p className='pctext'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
    </li>
    <li className="commentli">
    <img src="/images/avatar.png" alt="" className='pcimg'/>
    <p className='pctext'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
    </li>
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
                <span className='likenumber'>200</span>
                </div>
                <FaShare  className='icon-info'/>
                <AiOutlineDownload className='icon-info'/>
                <h5 className='remix'>Remix</h5>
               
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
        </div>
    </div>
  )
}

export default Postbig