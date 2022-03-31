import React, {useState} from 'react'
import axios from 'axios'
import "./Modal13.css"

function Modal13(props) {
  const closeModal = props.closeModal
  const projectID = props.projectID

  const channelList = props.channel
  const setChannelList = props.setChannel

  const [name, setName] = useState("")

  const addChannel = async () => {
    closeModal(false)

    var re = new RegExp("^([a-zA-Z][a-zA-Z0-9]*)$")

    if(re.test(name)) {
      const req = {
        'projectID': projectID,
        'channelName': name
      }
      await axios.post("http://localhost:8000/addChannel/", req).then((res) => {
        if (res.data["error"]) {
          console.log(res.data['error'])
        }
        else{
          let channel = channelList.slice()
          channel.push(res.data['channelInfo'])
          setChannelList(channel)
        }
      })
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  return (
    <div>
        <div className="modalBackground" id='modalBackground'>
        <div className="modalContainer13">
          <div className="titleCloseBtn">
            <button className='cross13'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>
          <div className="title13">
            <h1 className='create-title13'>New Channel</h1>
          </div>
          {/* <div className="body"> */}
            <label for="pname" className='p13name'>Enter Channel Name</label>
            <input 
              type="text" 
              className='change-text101'  
              name="Project Name" 
              value={name}
              onChange={handleNameChange}
            /><br></br>

            <div className="div">
              {/* <button className='folder-btn' onClick={() => {addProject({ "projectName" : projectName }); 
                  closeModal(false)}}>Create Project
              </button> */}
              <button className="folderbtnsssss1" onClick={addChannel}>Create Channel</button>
            </div>
          {/* </div>          */}
        </div>
      </div>
    </div>
  )
}

export default Modal13