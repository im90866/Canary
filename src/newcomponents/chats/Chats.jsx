import React, {useRef, useEffect, useState} from 'react'
import { Link} from 'react-router-dom'
import Message from '../Message/Message'
import "./chats.css"
import TextareaAutosize from 'react-textarea-autosize';


function Chats() {

  const messagesEndRef = useRef(null)
  const [message, setMessage] = useState("")

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    console.log(message)
  }, [message]);

  return (
    <div>
      <body className="chatscc">
        
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

              <li className="chatlistli">
                <Link to="/chats">
                  <img src="/images/avatar8.jpg" alt="" className='profile-pic2' />
                  <span className='chatlistlitext'>Aaron Abraham</span>
                </Link>
              </li>

              <li className="chatlistli">
                <Link to="/chats">
                  <img src="/images/avatar8.jpg" alt="" className='profile-pic2' />
                  <span className='chatlistlitext'>Aaron Abraham</span>
                </Link>
              </li>

              <li className="chatlistli">
                <Link to="/chats">
                  <img src="/images/avatar8.jpg" alt="" className='profile-pic2' />
                  <span className='chatlistlitext'>Aaron Abraham</span>
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
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
            <button className="chatSubmitButton" >
              <span className='send'>
                Send
              </span>
            </button>
          </div>
        </div>

      </div> 
</body>
    </div>
  )
}

export default Chats