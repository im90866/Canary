import React from 'react'
import "./Message.css"
export default function Message(props) {
  const own = props.own
  const messageData = props.messageData
  const senderName = props.senderName
  const senderImage = props.senderImage
  //const senderTime = props.senderTime

  return (
    <div>
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="messageImg"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <p className="messageText">{messageData} </p>
        </div>
        <div className="messageBottom">1 hour ago</div>
      </div>
    </div>
  )
}
