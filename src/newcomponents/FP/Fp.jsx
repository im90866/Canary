import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

import './Fp.css'
import Res from '../Topbar/Res'
function Fp() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")

  const codeConfirm = async () => {
    axios.get("http://localhost:8000/checkEmail/" + email).then((res) => {
      if(res.data['exist']) {
        const req = {
          'email': email,
        }
    
        axios.post('http://localhost:8000/forgotPassword/', req).then((res) => {
          if(res.data['success']){
            window.sessionStorage.setItem("email", email)
            navigate('/codeconfirmation')
          }
        })
        
      }
    }) 
    
  }

  const handleCodeInputChange = (e) => {
    setEmail(e.target.value)
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
                  value={email}
                  onChange={handleCodeInputChange}
                
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