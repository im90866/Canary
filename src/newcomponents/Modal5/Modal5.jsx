import React from 'react'
import "../Modal/Modal.css"
import axios from 'axios'
import { useState} from 'react';

function Modal5({image, closeModal, makeChange}) {
  

  return (
  
    <div>
      <div className="modalBackground">
        <div className="modalContaine3">
          <div className="titleCloseBtn">
            <button className='cross'
              onClick={() => {
                closeModal(false);
              }}>
              x
            </button> 
          </div>
          <div className="title">
<img src="/images/avatar2.png" alt=""  className='post-img'/>
          </div>
          <input type="text" placeholder='enter caption' className='change-text15'/>
              
          <div className="body">
            

            <div className="div">
              <button className='folder-btn' onClick={() => { 
                  closeModal(false)}}>Post
              </button>
            </div>
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
export default Modal5