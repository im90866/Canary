import React from 'react'
import "./Modal4.css"
function Modal4({ closeModal }) {
  return (
    <div>
      <div className="modalBackground2">
        <div className="modalContainer4">
          <div className="titleCloseBtn2">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}
            >
              x
            </button>
          </div>
          <h1 className="notifications">Notifications</h1>

          <ul className="notifications-2">
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

export default Modal4