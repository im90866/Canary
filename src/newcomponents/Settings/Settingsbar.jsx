import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Cardone from './Cardone'
import Cardtwo from './Cardtwo'

function Settingsbar() {
  return (
    <div>
        <Topbar/>
        <Sidebar/> 
        <div className="settings-container">
            <Cardone/>
            <Cardtwo/> 
        </div>
    </div>
  )
}

export default Settingsbar