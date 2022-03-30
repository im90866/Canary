import React, { useState, useEffect} from 'react'
import "./Modal11.css"
import { useNavigate} from 'react-router-dom';
import axios from 'axios'

function Modal11(prop) {
  const navigate = useNavigate()

  const profileID = prop.userID
  const closeModal = prop.closeModal
  
  const [reportVal, setReportVal] = useState("")

  const handleReportChange = (e) => {
    setReportVal(e.target.value)
  }

  const close = () => {
    closeModal(false)
  }

  const report = async () => {
    console.log(reportVal)

    if(reportVal != "") {
      const req = {
        'senderID': getCookie('userID'),
        'info': reportVal,
        'type': 'profile',
        'onProfileID': profileID
      }
  
      await axios.post("http://localhost:8000/report/", req).then((res) => {
        if (res.data["error"]) {
          console.log(res.data['error'])
        }
        else {
          closeModal(false)
        }
      })
    }
  }

  useEffect(() => {
    console.log(reportVal)
  })

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
            <h1 className="block-tt">Report User</h1>
            <p className='block-pp'>Why are you reporting this account?</p>
            <input type="text" 
                className='change-text130'  
                name="Report" 
                value={reportVal}
                onChange={handleReportChange}
                placeholder='Report'
            />
         </div>
         <div className="div-blockbtns">
             <button className="bbtn1" onClick={close}>Cancel</button>
             <button className="bbtn1" onClick={report}>Report</button>
         </div>
        </div>
      </div>
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


export default Modal11