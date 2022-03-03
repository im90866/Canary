import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from "react"

import Home from './newcomponents/Home/Home';
import Team from './newcomponents/Team/Team'
import Workspace from './newcomponents/Workspace/Workspace';
import CSRFToken from './Componenets/Auth/CSRF.js'
// import Projects from './Componenets/Projects/Projects';
import Profile from './newcomponents/Profile/Profile';
//import Profilepost from './Componenets/Profileposts/Profilepost';
// import Mainspace from './Componenets/Mainspace/Mainspace'
// import Upload from './Componenets/Upload/Upload'
import Collaboration from './newcomponents/Collaborations/Collaboration';
import Profileposts from './newcomponents/Profileposts/Profileposts';
// import Editprofile from './Componenets/Editprofile/Editprofile';
// import ChangePassword from './Componenets/ChangePassword/ChangePassword';
import Overlay from "./newcomponents/Overlay/Overlay"
import Project from './newcomponents/Projects/Project';
import Profileothers from './newcomponents/Profileothers/Profileothers';
import ProjectSettings from './newcomponents/ProjectSettings/ProjectSettings';
import Registrationpage from './newcomponents/Registration page/Registrationpage';
import Settingsbar from './newcomponents/Settings/Settingsbar';
import Cardthree from './newcomponents/Settings/Cardthree';
import Cardfour from './newcomponents/Settings/Cardfour';
import Cardfive from './newcomponents/Settings/Cardfive';
import Topbar from './newcomponents/Topbar/Topbar'
import Sidebar from './newcomponents/Sidebar/Sidebar'

function App() {
  const [logged, setLogged] = useState(false)
  const [change, setChange] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    console.log("change")
    setLogged(getCookie('username') != null)

    if (getCookie('username') != null)
      navigate('/home')

    //axios.get("http://localhost:8000/delete")
    //axios.get("http://localhost:8000/print")
  }, [logged])

  const protectOther = (component) => {
    if (getCookie('username') != null) {
      console.log("The answer is: " + getCookie('username') != null)
      return component
    }
    else {
      console.log("sus")
      return (<Navigate to="/" />)
    }
  }

  const protectLogin = () => {
    if (logged)
      return (<Navigate to="/home" />)
    else
      return (<Overlay logger={setLogged} check={logged} />)
  }

  return (
    <>
      <Topbar />
      <Sidebar />
      <CSRFToken />
      <Routes>

        <Route path="/" element={protectLogin()} />


        <Route path="/home" element={protectOther(<Home />)} />

        {/* <Route path="/signup" element={<Signup />}></Route> */}
        {/* <Route path="/mainspace" element={<Mainspace />}></Route>
      <Route path="/projects" element={<Projects />}></Route> */}

        <Route path="/workspace/:id" element={<Workspace />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/collaborations" element={<Collaboration />} />
        <Route path="/profile/profileposts" element={<Profileposts />} />
        <Route path="/project" element={<Project />} />
        <Route path="/profileothers" element={<Profileothers />} />

        <Route path="/team" element={<Team />} />
        <Route path="/projectsettings" element={<ProjectSettings />} />
        <Route path="/registrationpage" element={<Registrationpage />} />
        <Route path="/settings" element={<Settingsbar />} />
        <Route path="/changepassword" element={<Cardthree />} />
        <Route path="/blocked" element={<Cardfour />} />
        <Route path="/delete" element={<Cardfive />} />

      </Routes>

    </>

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

export default App;
