import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Cardone from './Cardone'
import Cardtwo from './Cardtwo'
import Cardthree from './Cardthree'
import Cardfour from './Cardfour'
import Cardfive from './Cardfive'
import { Link } from 'react-router-dom'
function Settingsbar(prop) {
  const cache = prop.cache
  const setCache = prop.setCache

  return (
    <div>
        <body className="settingscc1">
          
       
    
 
          <Cardtwo cache={cache} setCache={setCache}/> 
    
        </body>
    </div>
  )
}

export default Settingsbar