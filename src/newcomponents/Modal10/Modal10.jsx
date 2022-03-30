import React from 'react'
import"./Modal10.css"
import { Link} from 'react-router-dom'
import axios from 'axios'
function Modal10(props) {
  const closeModal = props.closeModal
  const userID = props.userID
  const setBlocked = props.setBlocked

  const close = () => {
    closeModal(false)
  }

  const blockAcc = async () => {
    const req = {
      'userID': getCookie('userID'),
      'otherUserID': userID
    }

    await axios.post("http://localhost:8000/blockUser/", req).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
      else{
        setBlocked(true)
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
             <h1 className="block-tt">Block User?</h1>
             <p className='block-pp'>Blocking Kyle, stops messages, follows, and comments.</p>
         </div>
        
         <div className="div-blockbtns1">
             <button className="bbtn1" onClick={close}>Cancel</button>
             <button className="bbtn1" onClick={blockAcc}>Block</button>
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

export default Modal10