import React, {useEffect, useState} from 'react'
import "./Message.css"

export default function Message(props) {
  const own = props.own
  const messageData = props.messageData
  const senderName = props.senderName
  const senderImage = props.senderImage
  const ownImage = props.ownImage
  const chatUserList = props.chatUserList
  const sentAt = props.sentAt

  //const senderTime = props.senderTime

  const [image, setImage] = useState("")

  useEffect(() => {
    console.log(ownImage)
    if(chatUserList != undefined) {
      console.log('its defined')
      if(own)
        setImage(ownImage)
      else{
        for(var i = 0; i < chatUserList.length;++i){
          if(chatUserList[i]['name'] == senderName)
            setImage(chatUserList[i]['imageVal'])
        }
      }

    }
    else {
      if(own)
        setImage(ownImage)
      else
        setImage(senderImage)
    }
  }, [ownImage])

  return (
    <div>
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="messageImg"
            src={image}
            alt=""
          />
          <p className="messageText">{messageData} </p>
        </div>
        <div className="messageBottom">{sentAt}</div>
      </div>
    </div>
  )
}
