import React from 'react'
import { useState, useEffect, useRef } from "react"
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

  }, [])

  return (

    <div>
      <body className="teamscc">
        <div className="ps-container">

          <div className="ps-box">
            <div className="team-title">
              <h1 className="ttitle">
                Teams
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
                          >
                            <div className="search-image-cropper">
                              <img style={{ width: '30px', height: '25px' }} className="search-image" src={res.profilePictureID} />
                            </div>
                            &nbsp;
                            &nbsp;
                            {res.username}
                          </button>
                          <button className=''> Add + </button>
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
            <ul className="project-memberslist">
              <li className="members">Nashwa Abdul </li>
              <li className="members">Aachal Davey </li>
              <li className="members">Aazim Faiz </li>
              <li className="members">Naina Agarwal </li>
              <li className="members">Ismail Mohammad </li>
              <li className="members">Aaron Abraham </li>
              <li className="members">Gurav Navyar </li>
              <li className="members">Madiha Kazi </li>
              <li className="members">Moaz Mohammad </li>

            </ul>
          </div>
        </div>

      </body>
    </div>
  )
}

export default ProjectSettings

function isNotEmpty(val) {
  if (val == "")
    return false
  else
    return true
}
