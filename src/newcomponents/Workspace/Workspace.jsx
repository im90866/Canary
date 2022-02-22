import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import "./Workspace.css"
import { BsImageFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
function Workspace() {
  return (
    <div>
  <Topbar/>
      <Sidebar/>
        <div className="workspace-container">
           <div className="workspace">
               <div className="workspace-title">
                   <h1 className="wtitle">WorkSpace</h1>
                   <button className="wbtn">Upload</button>
               </div>
           </div>
       
         </div>
          <div className="folder">
        <div className="folders">
       <Link to="/mainspace"> <BsImageFill className='folder-icon'/></Link>
       <div className="folder-info">
        <h3 className='folder-text'>Folder 1</h3>
        <BsThreeDots className='three-dots'/>
        </div> 
        </div>
        <div className="folders">
       <Link to="/mainspace"> <BsImageFill className='folder-icon'/></Link>
       <div className="folder-info">
        <h3 className='folder-text'>Folder 1</h3>
        <BsThreeDots className='three-dots'/>
        </div> 
        </div>
        <div className="folders">
       <Link to="/mainspace"> <BsImageFill className='folder-icon'/></Link>
       <div className="folder-info">
        <h3 className='folder-text'>Folder 1</h3>
        <BsThreeDots className='three-dots'/>
        </div> 
        </div>
        <div className="folders">
       <Link to="/mainspace"> <BsImageFill className='folder-icon'/></Link>
       <div className="folder-info">
        <h3 className='folder-text'>Folder 1</h3>
        <BsThreeDots className='three-dots'/>
        </div> 
        </div>
        <div className="folders">
       <Link to="/mainspace"> <BsImageFill className='folder-icon'/></Link>
       <div className="folder-info">
        <h3 className='folder-text'>Folder 1</h3>
        <BsThreeDots className='three-dots'/>
        </div> 
        </div>
        <div className="folders">
       <Link to="/mainspace"> <BsImageFill className='folder-icon'/></Link>
       <div className="folder-info">
        <h3 className='folder-text'>Folder 1</h3>
        <BsThreeDots className='three-dots'/>
        </div> 
        </div>
        <div className="folders">
       <Link to="/mainspace"> <BsImageFill className='folder-icon'/></Link>
       <div className="folder-info">
        <h3 className='folder-text'>Folder 1</h3>
        <BsThreeDots className='three-dots'/>
        </div> 
        </div>
        <div className="folders">
       <Link to="/mainspace"> <BsImageFill className='folder-icon'/></Link>
       <div className="folder-info">
        <h3 className='folder-text'>Folder 1</h3>
        <BsThreeDots className='three-dots'/>
        </div> 
        </div>
        <div className="folders">
       <Link to="/mainspace"> <BsImageFill className='folder-icon'/></Link>
       <div className="folder-info">
        <h3 className='folder-text'>Folder 1</h3>
        <BsThreeDots className='three-dots'/>
        </div> 
        </div>
        </div> 
        
        
        
    </div>
  )
}

export default Workspace