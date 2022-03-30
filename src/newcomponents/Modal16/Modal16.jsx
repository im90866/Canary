import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "./Modal16.css"

function Modal16(props) {
  const [reportList, setReportList] = useState([])
  const closeModal = props.closeModal

  const getReport = async() => {
    await axios.get("http://localhost:8000/getReports/").then((res) => {
      setReportList(res.data['reportList'])
      console.log(res.data['reportList'])
    })
  }

  useEffect(() => {
    getReport()
    
  }, [])

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
            {
              reportList.map((report) => 
                <li className="notificationslist">
                  <img src={report.imageVal} alt="" className='profile-pic' />
                  <div className="notif-text">{report.info}</div>
                </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Modal16