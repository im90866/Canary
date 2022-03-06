import React from 'react'
import { Link } from 'react-router-dom'
import "./Registrationpage.css"
import {BiUserCircle } from "react-icons/bi";
function Registrationpage() {
  return (
    <div>
         <div className="edit-profile2">
          <h1 className="registration">Registration </h1>
         <div className="existing-details">
            <BiUserCircle className='profile-picture' />
            <h3 className="profile-username">Nashwa_Abdul</h3>
            <button className='change'><span className="photo">Upload photo</span></button>
        </div>
        <div className="change-details">
            <div className="change-name">
                <label for="fname" className='fname'>Full Name</label>
                <input type="text" className='change-text1'  name="First Name" placeholder='Nashwa Abdul'/><br></br>
               
            </div>
          
            <div className="Dateofbirth">
            <label for="date" className='date'>Date of Birth</label>
            <input type="date" className='change-text5'  name="DOB" placeholder='16/10/2001'/>
            </div>
        </div>
     
      <Link to="/home"><button className='submit-changes' type='submit'>Register</button></Link> 
        
      </div>

    </div>
  )
}

export default Registrationpage