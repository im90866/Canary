import React from 'react'
import "./Modal13.css"
function Modal13({closeModal}) {
  return (
    <div>
        <div className="modalBackground" id='modalBackground'>
        <div className="modalContainer13">
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>
          <div className="title">
            <h1 className='create-title13'>New Channel</h1>
          </div>
          <div className="body">
            <label for="pname" className='p13name'>Enter Channel Name</label>
            <input type="text" 
                  className='change-text101'  
                  name="Project Name" 
               
            /><br></br>

            <div className="div">
              {/* <button className='folder-btn' onClick={() => {addProject({ "projectName" : projectName }); 
                  closeModal(false)}}>Create Project
              </button> */}
              <button className="folderbtnsssss1"  
                 >Create Channel</button>
            </div>
          </div>         
        </div>
      </div>
    </div>
  )
}

export default Modal13