import React, { useState, useEffect, useRef}from 'react'
import { useParams } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import "./ProjectSettings.css"
import { FaSearch, FaHome } from 'react-icons/fa'
import axios from "axios"

function ProjectSettings() {

  const [searchField, setSearchField] = useState("")
  const [searchRes, setSearchRes] = useState([])
  const listRef1 = useRef()
  const inputRef1 = useRef()
  const [isSearching, setIsSearching] = useState(false)

  const [memberList, setMemberList] = useState([])

  const projectId = useParams()['id']

  const search = async () => {
    setIsSearching(true)
    console.log(searchField)
    console.log(searchRes.length)

    if (searchField == "")
      setSearchRes([])
    else {
      const response = await axios.get("http://localhost:8000/search/" + searchField)
        .then((res) => {
          setIsSearching(false)
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
  }

  const inviteUser = async (userID) => {
    const request = {
      'userID': getCookie('userID'),
      'otherUserID': userID,
      'projectID': projectId
    }
    await axios.post("http://localhost:8000/inviteUser/", request).then((res) => {
      if (res.data["success"]) {
      }
      else {
      }
    })
  }

  const getProjectMembers = async() =>{
    await axios.get("http://localhost:8000/getProjectMembers/" + projectId,).then((res) => {
      if (res.data["success"]) {
        setMemberList(res.data['memberList'])
      }
      else {
      }
    })
  }

  useEffect(() => {
    // setPFP("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAADRCAMAAAAquaQNAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BMQEAAADCoPVP7WULoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuxZIAAeHuCGgAAAAASUVORK5CYII=")

    // axios.get("http://localhost:8000/getProfilePicture/" + String(getCookie('userID'))).then((res) => {
    //   if (res.data["success"]) {
    //     setPFP(res.data['imageString'])
    //   }
    // })

    inputRef1.current.addEventListener('click', (e) => {
      e.stopPropagation()
      listRef1.current.style.display = 'grid'
      // setIsSearching(true)

    })

    document.addEventListener('click', (e) => {
      listRef1.current.style.display = 'none'
      // setOpenModal(false)
    })

    getProjectMembers()

  }, [])

  return (

    <div>
      <body className="teamscc">
        <div className="ps-container">

          <div className="ps-box">
            <div className="team-title">
              <h1 className="ttitle">
                Project members
              </h1>
            </div>
            <div className="searchbar1">
              <FaSearch className="searchIcon" />
              <input
                placeholder="Search for friend to add them as your team members"
                className="searchInput1"
                value={searchField}
                onKeyUp={() => search()}
                onChange={e => setSearchField(e.target.value)}
                ref={inputRef1}
              />
              <div id="results1" className="results1" ref={listRef1}>
                {
                  searchRes.length > 0
                    ?
                    searchRes.map((res, index) => {
                      return (
                        <div className='items'>
                          <button
                            type="button"
                            key={index}
                            className="list-group-item list-group-item-action"
                            style={{display:'flex'}}
                          >
                            <div className="search-image-cropper">
                              <img style={{ width: '30px', height: '25px' }} className="search-image" src={res.profilePictureID} />
                            </div>
                            &nbsp;
                            &nbsp;
                            {res.username}
                            <button className='addButton' onClick={() => inviteUser(res.userID)}> Add + </button>
                          </button>
                        </div>
                      )
                    })
                    :
                    isNotEmpty(searchField) && !isSearching &&
                    <button
                      type="button"
                      className="list-group-item list-group-item-action"
                    >
                      No Results Found
                    </button>

                }
              </div>
            </div>
            <div className="Remove2">
            <ul className="project-memberslist">
            {
              memberList.map(member =>
                <li className="members">{member}</li>
               
              )
            }
              
            </ul>
            <button className='remove-mem'>Remove</button>
            </div>
          </div>
        </div>

      </body>
    </div>
  )
}

function isNotEmpty(val) {
  if (val == "")
    return false
  else
    return true
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

export default ProjectSettings

