import "./Topbar.css";
import { FaSearch, FaHome } from 'react-icons/fa'
import { RiChatSmile2Fill } from "react-icons/ri"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import { useState, } from "react"
import { MdExplore, MdOutlineNotificationsNone, MdSettings } from "react-icons/md"
import axios from "axios"

import { IconContext } from 'react-icons';
import { IoIosNotificationsOutline } from "react-icons/io";
import Modal4 from "../Modal4/Modal4";
function Topbar() {
  const [openModal, setOpenModal] = useState(false);
  const [searchField, setSearchField] = useState("")

  const search = () => {
    console.log("hello")
    const request = {
      'projectAdmin': String(getCookie('username'))
    }
    axios.get("http://localhost:8000/search/" + searchField, request).then((res) => {

    })
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"> <Link to="/home">Canary</Link></span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <FaSearch className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            value = {searchField}
            onKeyDown={() => search()}
          />
        </div>
      </div>
      <div className="topbarRight">

        <div className="topbarIcons">



          <div className="topbarIconItem">
            <IoIosNotificationsOutline onClick={() =>
              setOpenModal(true)} />
            <span className="topbarIconBadge">1</span>
          </div>
      
          <div className="topbarIconItem">
            <Link to="/profile"><img src="/images/avatar.png" alt="" className="topbarImg" /> </Link>
          </div>
    
        </div>
      
      </div>
      {openModal && <Modal4 closeModal={setOpenModal} />}
    </div>

  );
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export default Topbar