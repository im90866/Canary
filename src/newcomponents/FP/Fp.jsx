import React from 'react'
import { useNavigate} from 'react-router-dom'
import './Fp.css'
function Fp() {
  const navigate = useNavigate()

  const codeConfirm = () => {
    navigate('/codeconfirmation')
  }

  const back = () => {
    navigate('/')
  }

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
            <button className="fpbtn" onClick={codeConfirm}>
                Send
            </button>
            <br></br>
            <div className='back-to' onClick={back} >Back to Login</div>
          </div>
      </body>
    </div>
  )
}

export default Fp