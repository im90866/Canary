import "./Topbar.css";
import { FaSearch, FaHome } from 'react-icons/fa'
import { RiChatSmile2Fill } from "react-icons/ri"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import { useState, useEffect, useRef } from "react"
import { MdExplore, MdOutlineNotificationsNone, MdSettings } from "react-icons/md"
import axios from "axios"

import { IconContext } from 'react-icons';
import { IoIosNotificationsOutline } from "react-icons/io";
import Modal4 from "../Modal4/Modal4";
import ListGroup from 'react-bootstrap/ListGroup'
import Res from './Res'

function Topbar() {
  const [openModal, setOpenModal] = useState(false);

  const [searchField, setSearchField] = useState("")
  const [searchRes, setSearchRes] = useState([])
  const [PFP, setPFP] = useState("")

  const listRef = useRef()
  const inputRef = useRef()

  const search = async () => {
    console.log(searchField)
    console.log(searchRes.length)

    const response = await axios.get("http://localhost:8000/search/" + searchField)
      .then((res) => {
        if (res.data["success"]) {
          console.log("working")
          console.log(res)
          // return (res.data['results'])
          setSearchRes(res.data['results'])
        }
        else {
          console.log("Error: " + res.data["error"])
          setSearchRes([])
        }
      })
    console.log(searchRes)
    console.log(response)
  }

  const openClose = () => {
    if (openModal === false)
      setOpenModal(true)
    else
      setOpenModal(false)
  }

  useEffect(() => {
    setPFP("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAADRCAMAAAAquaQNAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BMQEAAADCoPVP7WULoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuxZIAAeHuCGgAAAAASUVORK5CYII=")

    axios.get("http://localhost:8000/getProfilePicture/" + String(getCookie('username'))).then((res) => {
      if (res.data["success"]) {
        setPFP(res.data['imageString'])
      }
    })

    inputRef.current.addEventListener('click', (e) => {
      e.stopPropagation()
      listRef.current.style.display = 'flex'
      // search()

    })

    document.addEventListener('click', (e) => {
      listRef.current.style.display = 'none'
    })
  }, [])

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
            value={searchField}
            onKeyUp={() => search()}
            onChange={e => setSearchField(e.target.value)}
            ref={inputRef}
          />
          <div id="results" className="results" ref={listRef}>
            {
              searchRes.length > 0
                ?
                searchRes.map((res, index) => {
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={(e) => {
                        inputRef.current.value = res.username;
                      }}
                      className="list-group-item list-group-item-action"
                    >
                      <img style={{ width: '30px', height: '25px' }} src={res.profilePictureID} />
                      &nbsp;
                      &nbsp;
                      {res.username}
                    </button>
                  )
                })
                :
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  No Results Found
                </button>
            }
          </div>

        </div>
      </div>



      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <IoIosNotificationsOutline onClick={() =>
              openClose()} />
            <span className="topbarIconBadge">1</span>
          </div>

          <div className="topbarIconItem">
            <div className="topbarImg-cropper">
              <Link to="/profile"><img src={PFP} alt="" className="topbarImg" /> </Link>
            </div>
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