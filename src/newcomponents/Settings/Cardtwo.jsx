 import React, {useState, useEffect, useRef} from 'react'
 import axios from 'axios'
 import Modal6 from '../Modal6/Modal6';
import Moda7 from '../Modal7/Moda7';
 function Cardtwo(prop) {
  const cache = prop.cache
  const setCache = prop.setCache

  const fileRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [PFP, setPFP] = useState("")
  const [changed, makeChange] = useState(false)
  const [image, setImage] = useState({
    selectedFile: null,
    imageFile: null,
    'images64': null,
  });

  const [username, setUsername] = useState("")
  const [fullname, setFullname] = useState("")
  const [invalidName, setInvalidName] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)

  const [email, setEmail] = useState("")
  const [DOB, setDOB] = useState("")

  const [values, setValues] = useState({
    username: "",
    fullname: "",
    email: "",
    DOB: "",
  });

  const handleNameInputChange = (e) => {
    setValues({ ...values, fullname: e.target.value })
  }

  const handleUsernameInputChange =  (e) => {
    if(e.target.value != " ") {
      setValues({ ...values, username: e.target.value })
      if(e.target.value != "") {
        axios.get('http://localhost:8000/checkUsername/' + e.target.value).then((res) => {
            if(res.data['exist'] == false || e.target.value == username) 
              setInvalidName(false)
            else
              setInvalidName(true)
        });
      }
    }
  }

  const handleEmailInputChange = (e) => {
    setValues({ ...values, email: e.target.value })
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
      'userID': String(getCookie('userID'))
    }

    console.log(image64)
    await axios.post('http://localhost:8000/changeProfilePicture/', req).then((res) => {
      console.log(res)
    });
    window.location.reload();
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
      'userID': getCookie('userID'),
      'username': values.username
    }

    if(username != values.username) {
      if(!invalidName)
        request['newUsername'] = values.username  
    }
    if(fullname != values.fullname)
      request['fullname'] = values.fullname
    if(email != values.email) {
      setOpenModal(true)
      request['email'] = values.email
    }
    if(DOB != values.DOB)
      request['DOB'] = values.DOB

    
    await axios.post('http://localhost:8000/uploadUserInfo/', request).then((res) => {
      console.log(res)
    });
    
    if(email == values.email)
      window.location.reload();
  }



  useEffect(() => {
    setPFP("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAADRCAMAAAAquaQNAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BMQEAAADCoPVP7WULoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuxZIAAeHuCGgAAAAASUVORK5CYII=")

    if(!('settingsProfilePicture' in cache)) {
      axios.get("http://localhost:8000/getProfilePicture/" + String(getCookie('userID'))).then((res) => {
        if(res.data["success"]) {
          setPFP(res.data['imageString'])
          
          cache['settingsProfilePicture'] = res.data['imageString']
          setCache(cache)
        }
      })
    }
    else{
      setPFP(cache['settingsProfilePicture'])
    }

    axios.get("http://localhost:8000/getUserInfo/" + String(getCookie('userID'))).then((res) => {
      if(res.data['success']){
        setValues({
          username: res.data['username'],
          fullname: res.data['fullname'],
          email: res.data['email'],
          DOB: res.data['DOB']
        })

        setUsername(res.data['username'])
        setFullname(res.data['fullname'])
        setEmail(res.data['email'])
        setDOB(res.data['DOB'])
      }
    })
  }, [])

  return (
    <div >
      <div className="edit-profile">
        <div className="existing-details">
          <div className='profile-picture-cropper'>
            <img src={PFP} alt="" className='profile-picture' />
          </div>

          <h3 className="profile-username">{getCookie('username')}</h3>
          <button className='change-photo' onClick={()=> fileRef.current.click()}><span className="photo">Upload photo</span></button>
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
            <label for="fname" className='fname'>Name</label>
            <input 
              type="text" 
              className='change-text1'  
              onChange={handleNameInputChange} 
              value={values.fullname} name="Fullame" 
            />
            <br></br>     
          </div>

          <div className="username-change">
            <label for="username" className='user1'>Username</label>
            <input 
              type="text" 
              className='change-text3' 
              name="Username" 
              onChange={handleUsernameInputChange}  
              value={values.username} 
            />
          </div>

          <div className="email-address">
            <label for="ID" className='emailID'>Email Id</label>
            <input 
              type="email" 
              className='change-text4' 
              name="Email" 
              onChange={handleEmailInputChange}  
              value={values.email} 
            />
          </div>

          <div className="Dateofbirth">
            <label for="date" className='date'>Date of Birth</label>
            <input 
              type="date" 
              className='change-text5'  
              name="DOB" 
              onChange={handleDOBInputChange}  
              value={values.DOB} 
            />
          </div>
        </div>
     
        <button className='submit-changes' type='submit' onClick={() => updateInfo()}>
          Update Profile
        </button>
        {openModal && <Moda7 setModal={setOpenModal} />} 
      </div>
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

 export default Cardtwo

