import React, {useRef, useEffect, useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Message from '../Message/Message'
import "./Chats1.css"

import axios from 'axios'
import { BsCircle } from "react-icons/bs"
import {FiSend} from "react-icons/fi"
import TextareaAutosize from 'react-textarea-autosize';
import WebSocketInstance from '../../JS_Files/websocket'

function Chats1() {
  const navigate = useNavigate()

  const [chatList, setChatList] = useState([])
  const [messageList, setMessageList] = useState([])

  const [currentChatID, setCurrentChatID] = useState("")
  const [currentUser, setCurrentUser] = useState('zero')
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
    window.sessionStorage.setItem("chatID", chatID);
    window.sessionStorage.setItem("username", username);
    window.sessionStorage.setItem("userID", userID);
    navigate('/chats/active')
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

      WebSocketInstance.sendToChat(textBoxVal, currentChatID, currentUserID)
    }
  }

  const handleMessageChange = (e) => {
    setTextBoxVal(e.target.value)
  }

  useEffect(() => {
    if(updater['unused']) {
      axios.get("http://localhost:8000/getChat/" + String(getCookie('userID')))
        .then((res) => {
          if (res.data["success"]) {
            for(var i = 0; i < res.data['chatList'].length; ++i){
              (res.data['chatList'])['messages'] = []
            }
            setChatList(res.data['chatList'])
            setOwnPicture(res.data['ownPicture'])
          }
          else
              console.log("Error: ")
        })
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
          'own': (updater['messageBy'] == getCookie('username'))
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
         
        <div className="chat-boxwrapper1">
        <BsCircle className="circle-icon" />
        <FiSend className="send-icon"/>
        <h1 className='your-messages'>Your Messages</h1>
        <p className='sendp'>Send private photos and messages to a friend or group.</p>

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

export default Chats1