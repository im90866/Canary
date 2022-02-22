import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Cardone from './Cardone'
import { useState,} from "react"
import Modal3 from '../Modal3/Modal3'

function Cardfive() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Topbar/>
        <Sidebar/>
        <div className="settings-container1">
        <Cardone/>
        <div className="change-password1">
           <div className="change-password-title">
               <h1 className="cptitle">Delete Account</h1>
               <p className='block'><strong>Would you like to delete your Behance account: @Nashwa_Abdul?</strong>
<br></br>This account contains 1 projects and drafts. Deleting your account will remove all of your content and data associated with it..</p>
<button className='submit-changes btnn1' type='submit'  onClick={() =>
          setOpenModal(true)}>Delete Account</button>
            
           </div>
           {openModal && <Modal3 closeModal={setOpenModal} />} 
           </div>
        
        </div>
   
    </div>
  )
}

export default Cardfive