import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Cardone from './Cardone'
import Cardtwo from './Cardtwo'
import Cardthree from './Cardthree'
import Cardfour from './Cardfour'
import Cardfive from './Cardfive'

function Settingsbar() {
  return (
    <div>
          <Topbar/> 
        <Sidebar/>    
        <h1 className="settings-title">Settings</h1>
        <div className="settings-container">
       
          <Cardone/>
            <Cardtwo/> 
        </div>
    </div>
  )
}

export default Settingsbar