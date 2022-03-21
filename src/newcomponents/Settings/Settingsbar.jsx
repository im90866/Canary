import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Cardone from './Cardone'
import Cardtwo from './Cardtwo'
import Cardthree from './Cardthree'
import Cardfour from './Cardfour'
import Cardfive from './Cardfive'

function Settingsbar(prop) {
  const cache = prop.cache
  const setCache = prop.setCache

  return (
    <div>
        <body className="settingscc1">
          
       
        <div className="settings-container">
       
         <Cardone/>
          <Cardtwo cache={cache} setCache={setCache}/>  
        </div>
        </body>
    </div>
  )
}

export default Settingsbar