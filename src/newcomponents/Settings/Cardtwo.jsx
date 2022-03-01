 import React from 'react'

 function Cardtwo() {
  return (
     <div>
      <div className="edit-profile">
        <div className="existing-details">
            <img src="/images/avatar.png" alt="" className='profile-picture' />
            <h3 className="profile-username">Nashwa_Abdul</h3>
            <button className='change'><span className="photo">Upload photo</span></button>
        </div>
        <div className="change-details">
            <div className="change-name">
                <label for="fname" className='fname'>First Name</label>
                <input type="text" className='change-text1'  name="First Name" placeholder='Nashwa'/><br></br>
                <label for="fname" className='lname'>Last Name</label>
           
                <input type="text" className='change-text2'  name="Last Name" placeholder="Abdul"/><br></br>
            </div>
            <div className="username-change">
            <label for="username" className='user1'>Username</label>
            <input type="text" className='change-text3'  name="Username" placeholder='Nashwa_Abdul'/>
            </div>
            <div className="email-address">
            <label for="ID" className='emailID'>Email Id</label>
            <input type="email" className='change-text4'  name="Username" placeholder='nashwa.abdul@gmail.com'/>
            </div>
            <div className="Dateofbirth">
            <label for="date" className='date'>Date of Birth</label>
            <input type="date" className='change-text5'  name="DOB" placeholder='16/10/2001'/>
            </div>
        </div>
     
      <button className='submit-changes' type='submit'>Update Profile</button>
        
      </div>

        </div>
      
  )
 }

 export default Cardtwo

