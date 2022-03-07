 import React, {useState, useEffect, useRef} from 'react'
 import axios from 'axios'

 function Cardtwo() {
  const fileRef = useRef();

  const [PFP, setPFP] = useState("")
  const [changed, makeChange] = useState(false)
  const [image, setImage] = useState({
    selectedFile: null,
    imageFile: null,
    'images64': null,
  });

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

  useEffect(() => {
    setPFP("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAADRCAMAAAAquaQNAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BMQEAAADCoPVP7WULoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuxZIAAeHuCGgAAAAASUVORK5CYII=")

    axios.get("http://localhost:8000/getProfilePicture/" + String(getCookie('username'))).then((res) => {
      if(res.data["success"]) {
        setPFP(res.data['imageString'])
      }
    })
  }, [])

  return (
     <div>
      <div className="edit-profile">
        <div className="existing-details">
          <div className='profile-picture-cropper'>
            <img src={PFP} alt="" className='profile-picture' />
          </div>
            <h3 className="profile-username">Nashwa_Abdul</h3>
            <button className='change' onClick={()=> fileRef.current.click()}><span className="photo">Upload photo</span></button>
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
                <input type="text" className='change-text1'  name="First Name" placeholder='Nashwa'/><br></br>
               
            </div>
            <div className="username-change">
            <label for="username" className='user1'>Username</label>
            <input type="text" className='change-text3'  name="Username" placeholder='Nashwa_Abdul'/>
            </div>
            <div className="email-address">
            <label for="ID" className='emailID'>Email Id</label>
            <input type="email" className='change-text4'  name="Username" placeholder='nashwa.abdul@gmail.com'/>
            </div>
            <div className="Dateofbirth">
            <label for="date" className='date'>Date of Birth</label>
            <input type="date" className='change-text5'  name="DOB" placeholder='16/10/2001'/>
            </div>
        </div>
     
      <button className='submit-changes' type='submit'>Update Profile</button>
        
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

