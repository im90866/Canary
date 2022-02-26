import React from 'react'
import "./Dropdown.css"
export default function Dropdown({ closeModal}) {
  return (
    <div>
      <div className="modalBackground3">
        <div className="modalContainer3">
          <div className="titleCloseBtn3">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}
            >
              x
            </button>
          </div>
          <div className="title3">
          <h1 className='create-title3'>New Folder</h1>
            <input type="text" className='creat-folder-title' placeholder='Enter folder name' />
          </div>
         
       
           <div className="div3">
      
           <button className='folder-btn3'><span className='folder-title3'>Create Folder</span></button>
           </div>
         
         
           
         
        </div>
      </div>
    </div>
  )
}
