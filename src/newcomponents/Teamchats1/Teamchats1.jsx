
import React, {useState,useRef, useEffect, useCallback} from 'react'
import { Link, useParams } from 'react-router-dom'
import Message from '../Message/Message'

import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize';
import {AiOutlineUsergroupAdd} from "react-icons/ai";
import WebSocketInstance from '../../JS_Files/websocket'
import Modal12 from '../Modal12/Modal12';
import Modal13 from '../Modal13/Modal13';
import { BsCircle } from "react-icons/bs"
import {FiSend} from "react-icons/fi"
function Teamchats1() {
  const projectId = useParams()['id']
  const [channelList, setChannelList] = useState([])
  const [messageList, setMessageList] = useState([])

  const [currentChatID, setCurrentChatID] = useState("")
  const [currentChatUserList, setCurrentChatUserList] = useState([])

  const [ownPicture, setOwnPicture] = useState("")

  const [textBoxVal, setTextBoxVal] = useState("")

  const [updater, setUpdater] = useState({'unused': true}) 
  
  const messagesEndRef = useRef(null)
  const [openModal4, setOpenModal4] = useState(false);

  const scrollToBottomSmooth = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: "end" })
  }

  const changeChannel = async (chatID, projectID) => {
    await axios.get("http://localhost:8000/getGroupMessages/" + String(chatID) + '/' + String(getCookie('userID')) )
      .then((res) => {
        if (res.data["success"]) {
            setCurrentChatID(chatID)
            setCurrentChatUserList(res.data['userImageList'])

            let counter = 0;
            for(var i in channelList){
              if(channelList[i].channelID == chatID){
                  let val = channelList.slice()
                  val[i].messageList = res.data['messageList']

                  setChannelList(val)
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
        'projectID': projectId,
        'messageData': textBoxVal,
        'chatID': currentChatID,
      }

      await axios.post("http://localhost:8000/sendGroupMessage/", req).then((res) => {
        if (res.data["error"]) {
          console.log(res.data['error'])
        }
      })
      setTextBoxVal("")

      WebSocketInstance.sendToGroupChat(textBoxVal, currentChatID, projectId)
    }
  }

  const handleMessageChange = (e) => {
    setTextBoxVal(e.target.value)
  }

  useEffect(() => {
    if(updater['unused']) {
      const req = {
        'projectID': projectId
      }

      axios.get("http://localhost:8000/getChannels/" + projectId + '/' + getCookie('userID'))
        .then((res) => {
          if (res.data["success"]) {
            console.log(res.data['channelList'])
            for(var i = 0; i < res.data['channelList'].length; ++i){
              (res.data['channelList'])['messages'] = []
            }
            console.log(res.data)
            setChannelList(res.data['channelList'])
            setOwnPicture(res.data['ownPicture'])
          }
          else
              console.log("Error: ")
        })
      WebSocketInstance.connectGroup(setUpdater)
    }
    else {
      console.log("working....");
      if(updater['chatID'] == currentChatID) {
        let val = messageList.slice()
        val.push({
          'chatID': updater['chatID'],
          'messageVal': updater['messageVal'],
          'messageBy': updater['messageBy'],
          'own': (updater['messageBy'] == getCookie('username'))
        })
        setMessageList(val)
      } 
    }
  }, [updater]);

  useEffect(() => {
    scrollToBottomSmooth()
  }, [messageList])

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
                {
                  channelList.map(chats => 
                  <li className="chatlistli" onClick={() => {changeChannel(chats.channelID)}}>
                    <span className='chatlistlitext'>{chats.channelName}</span>
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
             {openModal4 && 
              <Modal13 
                channel={channelList} 
                setChannel={setChannelList} 
                projectID={projectId} 
                closeModal={setOpenModal4} 
              />} 
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

export default Teamchats1