import React from 'react'

function Modal4({ closeModal}) {
  return (
    <div>
           <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}
            >
              x
            </button> 
          </div>
          <div className="title">
            <h1 className='create-title'>New Project</h1>
          </div>
          <div className="body">
            <label for="pname" className='p1name'>Enter Project Name</label>
          <input type="text" className='change-text10'  name="Project Name" placeholder='Project Name'/><br></br>
           <div className="div">
           <button className='folder-btn'>Create Project</button>
           </div>
          </div>
         
           
         
        </div>
      </div>
    </div>
  )
}

export default Modal4