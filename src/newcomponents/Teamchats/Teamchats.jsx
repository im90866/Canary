
import React, {useState,useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Message from '../Message/Message'
import "./Teamchats.css"
import TextareaAutosize from 'react-textarea-autosize';
import {AiOutlineUsergroupAdd} from "react-icons/ai";
import Modal12 from '../Modal12/Modal12';
import Modal13 from '../Modal13/Modal13';
function Teamchats() {
  
  const messagesEndRef = useRef(null)
  const [openModal4, setOpenModal4] = useState(false);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, []);

  return (
    <div>
      <body className="chatscc">
        
        <div className="messenger">
           <div className="chat-menu">
             <div className="chat-menuwrapper">
               <div className="newmessages">
               <h1 className="chat-title1">Chats</h1>
               <AiOutlineUsergroupAdd className='newchannel' onClick={() => { setOpenModal4(true);}}/>
               </div>
               <ul className="chatlist">
                 <li className="chatlistli2">
                   <Link to="/chats">
                 
                     <span className='chatlistlitext1'>Channel 1</span>
                   </Link>
                 </li>
   
                 <li className="chatlistli2">
                   <Link to="/chats">
                   
                     <span className='chatlistlitext1'>Channel 2</span>
                   </Link>
                 </li>
   
                 <li className="chatlistli2">
                   <Link to="/chats">
                   
                     <span className='chatlistlitext1'>Channel 3</span>
                   </Link>
                 </li>
   
                 <li className="chatlistli2">
                   <Link to="/chats">
                    
                     <span className='chatlistlitext1'>Channel 4</span>
                   </Link>
                 </li>
   
              
   
   
               </ul>
   
             </div>
           </div>
           <div className="chat-box">
             <div className="chat-boxwrapper">
               <Message />
               <Message />
               <Message own={true} />
               <Message />
               <Message />
               <Message />
               <Message />
               <Message />
               <Message />
               <Message />
               <Message />
               <Message own={true} />
               <Message own={true} />
               <Message own={true} />
               <Message own={true} /> 
   
   
           <div ref={messagesEndRef} />
             </div>
             <div className="chatBoxBottom"> 
               {/* <span
                 className="chatMessageInput"
                 placeholder="write something..."
                 role={'textbox'}
               >
               </span> */}
              <TextareaAutosize
                 style={{
                   width: '83%',
                   height: '50px',
                   padding: '10px',
                   position: 'relative',
                   left: '20px',
                   borderRadius: '25px',
                   border: '2px solid #ffb53b'
                 }}
               />
               <button className="chatSubmitButton" >
                 <span className='send'>
                   Send
                 </span>
               </button>
             </div>
             {openModal4 && <Modal13 closeModal={setOpenModal4} />} 
           </div>
         
         </div> 
   </body>
    </div>
  )
}

export default Teamchats