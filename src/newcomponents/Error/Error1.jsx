import React from 'react'
import { Link } from 'react-router-dom'
import "./Error1.css"
function Error1() {
  return (
    <div>
         <div className="body">
             <div className="error-page">
                 <h1 className="error-title">404 Page-Page Not Found</h1>
                 <p className="errorp">We can't seem to find the page your are looking for </p>
                 <Link to ="/home" className='back-homeee'>Back to Home</Link>
             </div>
         </div>
    </div>
  )
}

export default Error1