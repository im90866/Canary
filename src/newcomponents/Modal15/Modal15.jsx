import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Modal15.css"
import axios from 'axios'

function Modal15(props) {
  const closeModal = props.closeModal
  const type = props.type
  const postID = props.postID
  const projectID = props.projectID

  const navigate = useNavigate()

  const deletePost = async () => {
    const req = {
      'postID' : postID,
    }

    await axios.post("http://localhost:8000/deletePost/", req).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
    })

    closeModal(false)

    navigate('/home')
    window.location.reload();
  }

  const deleteProject = async () => {
    console.log(projectID)
    const req = {
      'projectID' : projectID,
    }

    await axios.post("http://localhost:8000/deleteProject/", req).then((res) => {
      if (res.data["error"]) {
        console.log(res.data['error'])
      }
      else {
        closeModal(false)

      navigate('/project')
      }
    })

    
  }

  return (
    <div>
          <div className="modalBackground2">
        <div className="modalContainer15">
          <div className="titleCloseBtn2">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}
            >
              x
            </button>
          </div>
          <div className="title2">
            {
              type == "project" && <h1 className='create-title2'>Are You Sure You Want To<br></br> Delete This Project</h1>
            }
            {
              type == "post" && <h1 className='create-title2'>Are You Sure You Want To<br></br> Delete this Post</h1>
            }
            
          </div>
            <div className="div2">
              {
                type == "project" && <button className='folder-btn4' onClick={deleteProject}>Yes</button>
              }

              {
                type == "post" && <button className='folder-btn4' onClick={deletePost}>Yes</button>
              }
            
            <button className='folder-btn35' onClick={() => {closeModal(false);}}>Cancel</button>
            </div>         
        </div>
      </div>
    </div>
  )
}

export default Modal15