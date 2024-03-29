import React, {useRef, useEffect, useState} from 'react'
import { Link} from 'react-router-dom'
import Message from '../Message/Message'
import "./chats.css"

import axios from 'axios'

import TextareaAutosize from 'react-textarea-autosize';
import WebSocketInstance from '../../JS_Files/websocket'

function Chats() {
  const [chatList, setChatList] = useState([])
  const [messageList, setMessageList] = useState([])

  const [currentChatID, setCurrentChatID] = useState("")
  const [currentUser, setCurrentUser] = useState('')
  const [currentUserID, setCurrentUserID] = useState("")
  const [currentUserPicture, setCurrentUserPicture] = useState("")

  const [ownPicture, setOwnPicture] = useState("")

  const [updater, setUpdater] = useState({'unused': true}) 
  const [u_flag, set_u_flag] = useState(false)
  const [uc_flag, set_uc_flag] = useState(true)

  const [textBoxVal, setTextBoxVal] = useState("")

  const messagesEndRef = useRef(null)
  const [message, setMessage] = useState("")

  const scrollToBottomSmooth = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: "end" })
  }

  const changeChat = async (chatID, username, userID) => {
    await axios.get("http://localhost:8000/getMessages/" + String(chatID) + '/' + String(getCookie('userID') + '/' + userID) )
      .then((res) => {
        if (res.data["success"]) {
            setCurrentChatID(chatID)
            setCurrentUser(username)
            setCurrentUserID(userID)
            setCurrentUserPicture(res.data['otherProfilePicture'])

            let counter = 0;
            for(var i in chatList){
              if(chatList[i].userID == userID){
                  let val = chatList
                  val[i].messageList = res.data['messageList']

                  setChatList(val)
                  break;
              }
              counter += 1
            }
            console.log(res.data['messageList'])
            setMessageList(res.data['messageList'])
            scrollToBottom()
        }
        else
            console.log("Error: ")
      })
  }

  const sendMessage = async () => {
    if(textBoxVal != "") {
      const req = {
        'userID': getCookie('userID'),
        'otherPersonsID': currentUserID,
        'messageData': textBoxVal,
        'chatID': currentChatID,
      }

      await axios.post("http://localhost:8000/sendMessage/", req).then((res) => {
        if (res.data["error"]) {
          console.log(res.data['error'])
        }
      })
      setTextBoxVal("")

      console.log('sending in chat')
      WebSocketInstance.sendToChat(textBoxVal, currentChatID, currentUserID)
    }
  }

  const handleMessageChange = (e) => {
    if(e.nativeEvent.inputType === "insertLineBreak") {
      sendMessage()
      return;
    }
    setTextBoxVal(e.target.value)
  }

  useEffect(() => {
    let chatID = window.sessionStorage.getItem("chatID");
    let username = window.sessionStorage.getItem("username");
    let userID = window.sessionStorage.getItem("userID");

    if(!chatID) 
      throw("something went wrong")
    if(updater['unused']) {
      axios.get("http://localhost:8000/getChat/" + String(getCookie('userID')))
        .then((res) => {
          if (res.data["success"]) {
            for(var i = 0; i < res.data['chatList'].length; ++i){
              (res.data['chatList'])['messages'] = []
            }
            setChatList(res.data['chatList'])
            console.log(res.data['ownPicture'])
            setOwnPicture(res.data['ownPicture'])
          }
          else
              console.log("Error: ")
        })

      changeChat(chatID, username, userID)
      WebSocketInstance.connect(setUpdater)
    }
    else {
      console.log("working....");
      updateChatList()
      if(updater['chatID'] == currentChatID) {
        let val = messageList.slice()
        val.push({
          'chatID': updater['chatID'],
          'messageVal': updater['messageVal'],
          'messageBy': updater['messageBy'],
          'own': (updater['messageBy'] == getCookie('username')),
          'createdAt': '1s ago'
        })
        setMessageList(val)
        scrollToBottomSmooth()
      }
    }
    
  }, [updater]);

  const updateChatList = async () => {
    console.log("im updated")
    await axios.get("http://localhost:8000/getChat/" + String(getCookie('userID')))
    .then((res) => {
      setChatList(res.data['chatList'])
      scrollToBottomSmooth()
    })

  }

  return (
    <div>
      <body className="chatscc">
        
     <div className="messenger">
        <div className="chat-menu">
          <div className="chat-menuwrapper">
            <h1 className="chat-title">Chats</h1>

            <ul className="chatlist">
            {
              chatList.map(chats => 
              <li className="chatlistli" onClick={() => {changeChat(chats.chatID, chats.username, chats.userID)}}>
                <img src={chats.profilePicture} alt="" className='profile-pic2' />
                <span className='chatlistlitext'>{chats.username}</span>
              </li>
              )
            }
            </ul>

          </div>
        </div>
        <div className="chat-box">
          <div className="chatbox-name">
            <img src={currentUserPicture} alt="" className='profile-pic4' />
            <div className="nameprof">{currentUser}</div>
          </div>
          <div className="chat-boxwrapper">
            
            {
              messageList.map(message => 
                <div>
                  <Message 
                    own={message.own} 
                    messageData={message.messageVal} 
                    senderName={message.messageBy}
                    senderImage={currentUserPicture}
                    ownImage={ownPicture}
                    sentAt={message.createdAt}
                  />
                </div>
              )
            }
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
                border: '2px solid #ffb53b',
                resize: 'none',
              }}
              value={textBoxVal}
              onChange={handleMessageChange}
              className="chatbar"
            />
            <button className="chatSubmitButton"  onClick={() => sendMessage()}>
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

export default Chats