import React from 'react'
import { Link } from 'react-router-dom'
import './Fp.css'
function Fp() {
  return (
    <div>
      <body className="fp">
          <div className="fp-container">
              <h3 className="fp-title">Forgot Your Password?</h3>
              <p className="fppp">Enter Your Email Id to receive your password</p>
              <p className='fpp2'> reset instructions</p>
              <input type="text" 
                  className='change-text103'  
                  name="Project Name" 
                  placeholder='Email Address'
                
            />
            <button className="fpbtn">< Link to="/codeconfirmation">
                Send
                </Link>
            </button>
            <br></br>
            <Link to="/" className='back-to'>Back to Login</Link>
          </div>
      </body>
    </div>
  )
}

export default Fp