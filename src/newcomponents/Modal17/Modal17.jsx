import React from 'react'
import axios from 'axios'

import { Link} from 'react-router-dom'
function Modal17(props) {
  const closeModal = props.closeModal
  const userID = props.userID
  const setBlocked = props.setBlocked

  const unblockAcc = async () => {
    const req = {
      'userID': getCookie('userID'),
      'otherUserID': userID
    }

    await axios.post("http://localhost:8000/blockUser/", req).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
      else{
        setBlocked(false)
        closeModal(false)
      }
    })
  }

  return (
    <div>
      <div className="modalBackground">
        <div className="modalContainer10">
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>
         
         <div className="block-title">
             <h1 className="block-tt">Unblock User?</h1>
             <p className='block-pp'>Unblocking Kyle,you can message, follows and comment. You can  view each other’s profiles.</p>
         </div>
        
         <div className="div-blockbtns1">
             <button className="bbtn1">Cancel</button>
             <button className="bbtn1" onClick={unblockAcc}>Unblock</button>
         </div>
        </div>
      </div>
    </div>
  )
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

export default Modal17