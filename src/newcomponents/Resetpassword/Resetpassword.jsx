import React from 'react'
import { Link } from 'react-router-dom'
import "./Resetpassword.css"
function Resetpassword() {
  return (
    <div>
        <div className="reset-password">
        <div className="fp-container">
              <h3 className="rp-title">Reset Password</h3>
              <p className="rpp">Please Enter Your new password</p>
           
              <input type="password" 
                  className='change-text103'  
                  name="new password" 
                  placeholder='new password'
            
                
            />
                <input type="password" 
                  className='change-text104'  
                  name="re-enter new password" 
                  placeholder='re-enter new password'
                
                
            />
            <button className="fpbtn">< Link to="/codeconfirmation">
              Submit
                </Link>
            </button>
            <br></br>
          
          </div>
        </div>
    </div>
  )
}

export default Resetpassword