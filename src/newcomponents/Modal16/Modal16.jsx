import React from 'react'
import "./Modal16.css"
function Modal16({ closeModal }) {
  return (
    <div>
  <div className="modalBackground" id='modalBackground'>
        <div className="modalContainer16">
          <div className="titleCloseBtn">
            <button className='cross13'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>
          <div className="title13">
            <h1 className='create-title16'>Reports</h1>
          </div>
         <ul className="notifications-4">
            <li className="notificationslist">
              <img src="/images/avatar.png" alt="" className='profile-pic' />
              <div className="notif-text">User1 liked your post</div>
            </li>
            <li className="notificationslist">
              <img src="/images/avatar.png" alt="" className='profile-pic' />
              <div className="notif-text">User1 liked your post</div>
            </li>
            <li className="notificationslist">
              <img src="/images/avatar.png" alt="" className='profile-pic' />
              <div className="notif-text">User1 liked your post</div>
            </li>
            <li className="notificationslist">
              <img src="/images/avatar.png" alt="" className='profile-pic' />
              <div className="notif-text">User1 liked your post</div>
            </li>
            <li className="notificationslist">
              <img src="/images/avatar.png" alt="" className='profile-pic' />
              <div className="notif-text">User1 liked your post</div>
            </li>
            <li className="notificationslist">
              <img src="/images/avatar.png" alt="" className='profile-pic' />
              <div className="notif-text">User1 liked your post</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Modal16