import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from "react"

import axios from 'axios'

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
import Chats from './newcomponents/chats/Chats';

import Explore from './newcomponents/Explore/Explore';
import Teamchats from './newcomponents/Teamchats/Teamchats';
import Postbig from './newcomponents/Postbig/Postbig';
import Sidebar2 from './newcomponents/Sidebar2/Sidebar2';

import WebSocketInstance from './JS_Files/websocket';
import Modal6 from './newcomponents/Modal6/Modal6';
import Fp from './newcomponents/FP/Fp';
import Resetpassword from './newcomponents/Resetpassword/Resetpassword';
import Cardsix from './newcomponents/Settings/Cardsix';
import Team1 from './newcomponents/Team/Team1';
import Team2 from './newcomponents/Team/Team2';
import Team3 from './newcomponents/Team/Team3';

function App() {

    const location = useLocation()
    const [logged, setLogged] = useState(false)
    const [change, setChange] = useState(false)
    const [check, setCheck] = useState()

    const [cache, setCache] = useState({})

    const socketRef = null

    let navigate = useNavigate()

    const user = getCookie('username')
    console.log(user)

    useEffect(() => {
        console.log("change")
        setLogged(getCookie('username') != null)

        if (getCookie('username') != null && logged){
            navigate('/home')
        }

        //axios.post("http://localhost:8000/sendEmail/", {})
        //axios.get("http://localhost:8000/print")

    }, [user])

    const protectOther = (component) => {
        if (getCookie('username') != null) {
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

    useEffect(() => {
        if (location.pathname.includes("/workspace"))
            setCheck(location.pathname.includes("/workspace"))
        else if (location.pathname === "/teamchats")
            setCheck(location.pathname.includes("/teamchats"))
        else if (location.pathname === "/team")
            setCheck(location.pathname.includes("/team"))
        else if (location.pathname === "/projectsettings")
            setCheck(location.pathname.includes("/projectsettings"))
        else
            setCheck(false)
    }, [location.pathname]);

    return (
      <>
        {
          user !== null
           ?
          <>
            <Topbar cache={cache} setCache={setCache}/>
            {/* {
                !check
                    ?
                    <>
                        <Sidebar />
                        {
                            console.log("working")
                        }
                    </>
                    :
                    <Sidebar2 />
            } */}
            <CSRFToken />
            <Routes>
              <Route path="/" element={protectLogin()} />
              <Route path="/home" element={protectOther(<Home cache={cache} setCache={setCache}/>)} />
   
              <Route path="/workspace/:id" element={<Workspace />} />
              <Route path="/profile" element={<Profile cache={cache} setCache={setCache}/>} />
              <Route path="/profile/collaborations" element={<Collaboration />} />
              <Route path="/profile/profileposts" element={<Profileposts />} />
              <Route path="/project" element={<Project cache={cache} setCache={setCache}/>} />
              <Route path="/profile/:userID" element={<Profileothers />} />

              <Route path="/team" element={<Team />} />
              <Route path="/projectsettings" element={<ProjectSettings />} />
              <Route path="/registrationpage" element={<Registrationpage />} />
              <Route path="/settings" element={<Settingsbar cache={cache} setCache={setCache}/>} />
              <Route path="/changepassword" element={<Cardthree />} />
              <Route path="/blocked" element={<Cardfour />} />
              <Route path="/delete" element={<Cardfive />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/teamchats" element={<Teamchats />} />
              <Route path="/explore" element={<Explore/>} />
              
              <Route path="/post/:id" element={<Postbig />} />
            
              <Route path="/codeconfirmation" element={<Modal6 />} />
              <Route path="/forgotpassword" element={<Fp/>} />
              <Route path="/resetpassword" element={<Resetpassword/>} />
              <Route path="/privacy" element={<Cardsix/>} />
              <Route path="/admin" element={<Team1/>} />
              <Route path="/remove" element={<Team2/>} />
              <Route path="/deleteproject" element={<Team3/>} />
            </Routes>
          </>
          :
          <>
            <CSRFToken />
            <Routes>
              <Route path="/" element={protectLogin()} />
              <Route path="/home" element={protectOther(<Home />)} />
            </Routes>
          </>
        }
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