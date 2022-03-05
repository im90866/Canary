import React from 'react'
import { Link } from 'react-router-dom'
import Message from '../Message/Message'
import "./chats.css"
function Chats() {
  return (
    <div>
      <div className="messenger">
      <div className="chat-menu">
        <div className="chat-menuwrapper">
          <h1 className="chat-title">Chats</h1>
        <ul className="chatlist">
          <li className="chatlistli">
          <Link to="/chats">
            <img src="/images/avatar.png" alt="" className='profile-pic2' />
            <span className='chatlistlitext'>Nashwa Abdul</span>
            </Link>
            </li>
        
            <li className="chatlistli">
            <Link to="/chats">
            <img src="/images/avatar2.png" alt="" className='profile-pic2' />
            <span className='chatlistlitext'>Aachal Davey</span>
            </Link>
            </li>
           
            <li className="chatlistli">
            <Link to="/chats">
            <img src="/images/avatar3.png" alt="" className='profile-pic2' />
            <span className='chatlistlitext'>Aazim Faiz</span>
            </Link>
            </li>
        
            <li className="chatlistli">
            <Link to="/chats">
            <img src="/images/avatar4.png" alt="" className='profile-pic2' />
            <span className='chatlistlitext'>Naina Agarwal</span>
            </Link>
            </li>
       
            <li className="chatlistli">
            <Link to="/chats">
            <img src="/images/avatar5.png" alt="" className='profile-pic2' />
            <span className='chatlistlitext'>Ismail Mohammad</span>
            </Link>
            </li>
        
            <li className="chatlistli">
            <Link to="/chats">
            <img src="/images/avatar6.png" alt="" className='profile-pic2' />
            <span className='chatlistlitext'>Guarav Navyar</span>
            </Link>
            </li>
         
            <li className="chatlistli">
            <Link to="/chats">
            <img src="/images/avatar7.png" alt="" className='profile-pic2' />
            <span className='chatlistlitext'>Madiha Kazi</span>
            </Link>
            </li>
            
            <li className="chatlistli">
            <Link to="/chats">
            <img src="/images/avatar8.jpg" alt="" className='profile-pic2' />
            <span className='chatlistlitext'>Aaron Abraham</span>
            </Link>
            </li>
          
        
          </ul>

        </div>
        </div>
      <div className="chat-box">
        <div className="chat-boxwrapper">
    <Message/>
    <Message/>
    <Message own={true}/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message own={true}/>
    <Message own={true}/>
    <Message own={true}/>
    <Message own={true}/>

        
    <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                   
                  ></textarea>
                  <button className="chatSubmitButton" >
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

export default Chats