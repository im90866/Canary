import React from 'react'
import { Link } from 'react-router-dom'
import Message from '../Message/Message'
import "./Teamchats.css"
function Teamchats() {
  return (
    <div>
         <div className="messenger">
      <div className="chat-menu">
        <div className="chat-menuwrapper">
          <h1 className="chat-title">Chats</h1>
        <ul className="chatlist">
          <li className="chatlistli2">
          <Link to="/chats">
           
            <span className='chatlistlitext'>Channel 1</span>
            </Link>
            </li>
        
            <li className="chatlistli2">
            <Link to="/chats">
         
            <span className='chatlistlitext'>Channel 2</span>
           
            </Link>
            </li>
           
            <li className="chatlistli2">
            <Link to="/chats">
          <span className='chatlistlitext'>Channel 3</span>
            </Link>
            </li>
        
            <li className="chatlistli2">
            <Link to="/chats">
           
            <span className='chatlistlitext'>Channel 4</span>
            </Link>
            </li>
       
            <li className="chatlistli2">
            <Link to="/chats">
          
            <span className='chatlistlitext'>Channel 5 </span>
            </Link>
            </li>
        
            <li className="chatlistli2">
            <Link to="/chats">
          
            <span className='chatlistlitext'>Channel 6</span>
            </Link>
            </li>
         
            <li className="chatlistli2"> 
            <Link to="/chats">
         
            <span className='chatlistlitext'>Channel 7</span>
            </Link>
            </li>
            
            <li className="chatlistli2">
            <Link to="/chats">
           
            <span className='chatlistlitext'>Channel 8</span>
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

        
   
          </div>
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
  )
}

export default Teamchats