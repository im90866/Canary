import React, { useState } from 'react'
import { BsClipboard } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "./Modal9.css"

function Modal9(prop) {
  const navigate = useNavigate()

  const postID = prop.postID
  const closeModal1 = prop.closeModal1
  const [reportVal, setReportVal] = useState("")

  const close = () => {
    closeModal1(false)
  }

  const setReport = (value) => {
    setReportVal(value)
  }

  const report = async () => {
    if(reportVal != "") {
      const req = {
        'senderID': getCookie('userID'),
        'info': reportVal,
        'type': 'post',
        'onPostID': postID
      }
  
      await axios.post("http://localhost:8000/report/", req).then((res) => {
        if (res.data["error"]) {
          console.log(res.data['error'])
        }
        else {
          closeModal1(false)
        }
      })
    }
  }

  return (
    <div onClick={e => e.stopPropagation()}>
      <div className="modalBackground">
        <div className="modalContainer9">
          <div className="titleCloseBtn">
            <button className='crossBlocker'
              onClick={() => {
                close()
              }}>
              X
            </button>
          </div>
          <div className="titlereport">
            <h1 className='create-title9'>Report</h1>
          </div>
          <div className="reports">
            <ul className='report-list'>
              <li className="report-listitem">
                <input type="radio" id="html" name="fav_language" value="HTML" onClick={() => setReport('Spam or irrelevant content')}/>
                <label for="html" className='html'>Spam or irrelevant content</label>
              </li>
              <li className="report-listitem">
                <input type="radio" id="html" name="fav_language" value="HTML" onClick={() => setReport('Nudity or Sexual Activity')}/>
                <label for="html" className='html'> Nudity or Sexual Activity</label>
              </li>
              <li className="report-listitem">  
                <input type="radio" id="html" name="fav_language" value="HTML" onClick={() => setReport('Offensive or illegal')} />
                <label for="html" className='html'>Offensive or illegal</label>
              </li>
              <li className="report-listitem">  
                <input type="radio" id="html" name="fav_language" value="HTML" onClick={() => setReport('Graphic Violence')}/>   
                <label for="html" className='html'>Graphic Violence</label>
              </li>
              <li className="report-listitem">  
                <input type="radio" id="html" name="fav_language" value="HTML" onClick={() => setReport('Hateful or abusive content')}/>  
                <label for="html" className='html'>Hateful or abusive content</label>
              </li>
            </ul>
          </div>
          <button className='report-btn' onClick={report}>Report Post</button>
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


export default Modal9