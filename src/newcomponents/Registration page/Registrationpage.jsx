import React, {useState, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import "./Registrationpage.css"
import {BiUserCircle } from "react-icons/bi";

import axios from 'axios'

function Registrationpage() {
  const fileRef = useRef();
  const navigate = useNavigate()

  const [PFP, setPFP] = useState("")
  const [changed, makeChange] = useState(false)
  const [image, setImage] = useState({
    selectedFile: null,
    imageFile: null,
    'images64': null,
  });

  const [values, setValues] = useState({
    fullname: "",
    DOB: "",
  });

  const handleNameInputChange = (e) => {
    setValues({ ...values, fullname: e.target.value })
  }

  
  const handleDOBInputChange = (e) => {
    setValues({ ...values, DOB: e.target.value })
  }

  const fileSelect = async (event) => {
    var file = event.target.files[0]
    const image64 = await base64(file)
    setImage({
      selectedFile: file,
    })

    const req = {
      'imageString': image64,
      'username': String(getCookie('username'))
    }

    console.log(image64)
    await axios.post('http://localhost:8000/changeProfilePicture/', req).then((res) => {
      console.log(res)
    });

    makeChange(true)
  }

  const base64 = (file) => {
    return new Promise(function (resolve, reject) {
      console.log(file.name)
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (file) {
        console.log(file)
        setImage({
          'image64': String(file.target.result)
        })
        resolve(file.target.result)
      }
    })
  }

  const updateInfo = async () => {
    let request = {
      'username': getCookie('username')
    }
    
    if(values.fullname != "")
      request['fullname'] = values.fullname
    if(values.DOB != "")
      request['DOB'] = values.DOB

    await axios.post('http://localhost:8000/uploadUserInfo/', request).then((res) => {
      console.log(res)
    });

    navigate('/home')
  }

  useEffect(() => {
    makeChange(false)
    axios.get("http://localhost:8000/getProfilePicture/" + String(getCookie('username'))).then((res) => {
      if(res.data["success"]) {
        setPFP(res.data['imageString'])
      }
    })
  }, [changed])

  return (
    <div>
      <body className="regcc">
        

      <div className="edit-profile2">
        <h1 className="registration">Registration </h1>

        <div className="existing-details">
          <div className='profile-picture-cropper'>
            <img src={PFP} alt="" className='profile-picture'/>
          </div>
          <h3 className="profile-username1">Nashwa_Abdul</h3>
          <button className='change1' onClick={()=> fileRef.current.click()}><span className="photo1">Upload photo</span></button>
          <input
            ref={fileRef}
            onChange={fileSelect}
            multiple={false}
            type="file"
            hidden
          />
        </div>

        <div className="change-details">
          <div className="change-name">
            <label for="fname" className='fname'>Full Name</label>
            <input 
              type="text" 
              className='change-text1'  
              name="First Name" 
              placeholder='Name' 
              onChange={handleNameInputChange} 
              value={values.fullname}
            />
            <br></br>
          </div>
          
          <div className="Dateofbirth">
            <label for="date" className='date'>Date of Birth</label>
            <input 
              type="date" 
              className='change-text50' 
              name="DOB" 
              onChange={handleDOBInputChange}  
              value={values.DOB} 
            />
          </div>
        </div>
     
        <button className='submit-changes' onClick={() => updateInfo()} type='submit'>Continue</button>

      </div>
      </body>
    </div>
  )
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

export default Registrationpage