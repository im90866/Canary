import React from 'react';
import "./Modal.css"
function Modal({ closeModal}) {
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>Create Folder</h1>
          </div>
          <div className="body">
           <input type="text"  placeholder='Name of the folder' className='folder-name'/>
           <div className="div">
           <button className='folder-btn'>Create Folder</button>
           </div>
          </div>
         
           
         
        </div>
      </div>
    )
            }
export default Modal;
