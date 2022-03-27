import React from 'react'
import {BsClipboard} from "react-icons/bs";
import"./Modal9.css"
function Modal9(prop) {
  const closeModal1 = prop.closeModal1
  const close = () => {
    console.log('3ss')
    closeModal1(false)
  }

  return (
    <div>
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
           <input type="radio" id="html" name="fav_language" value="HTML"/>
           
           <label for="html" className='html'>Spam or irrelevant content</label>
           </li>
           <li className="report-listitem">
           <input type="radio" id="html" name="fav_language" value="HTML"/>
           <label for="html" className='html'> Nudity or Sexual Activity</label></li>
           <li className="report-listitem">  <input type="radio" id="html" name="fav_language" value="HTML"/>
           <label for="html" className='html'>Offensive or illegal</label></li>
           <li className="report-listitem">  <input type="radio" id="html" name="fav_language" value="HTML"/>   <label for="html" className='html'>Imminent physical harm</label></li>
           <li className="report-listitem">  <input type="radio" id="html" name="fav_language" value="HTML"/>   <label for="html" className='html'>Misinformation</label></li>
           <li className="report-listitem">  <input type="radio" id="html" name="fav_language" value="HTML"/>   <label for="html" className='html'>Graphic Violence</label></li>
           <li className="report-listitem">  <input type="radio" id="html" name="fav_language" value="HTML"/>   <label for="html" className='html'>Hateful or abusive content</label></li>
           <li className="report-listitem">  <input type="radio" id="html" name="fav_language" value="HTML"/>   <label for="html" className='html'>Harmful or Dangerous acts</label></li>

       </ul>
       </div>  
       <button className='report-btn'>Report Post</button>     
        </div>
      </div>
    </div>
  )
}

export default Modal9