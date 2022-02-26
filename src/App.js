import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './newcomponents/Home/Home';
import Login from "./Componenets/Login/Login"
import Signup from './Componenets/Signup/Signup'
import Team from './newcomponents/Team/Team'
import Workspace from './Componenets/Workspace/Workspace';
import { useEffect } from "react"
import CSRFToken from './Componenets/Auth/CSRF.js'
import Projects from './Componenets/Projects/Projects';
import Profile from './Componenets/Profile/Profile';
import Profilepost from './Componenets/Profileposts/Profilepost';
import Mainspace from './Componenets/Mainspace/Mainspace'
import Upload from './Componenets/Upload/Upload'
import Collaboration from './Componenets/Collaboration/Collaboration';
import Editprofile from './Componenets/Editprofile/Editprofile';
import ChangePassword from './Componenets/ChangePassword/ChangePassword';
import Overlay from "./newcomponents/Overlay/Overlay"

function App() {
  useEffect(() => {
    //axios.get("http://localhost:8000/delete")
    //axios.get("http://localhost:8000/print")
  }, [])
  return (
    <>
    <CSRFToken />
    <Routes>
      <Route path="/" element={<Overlay/>}></Route>
      <Route path="/home" element={<Home />}></Route>
      {/* <Route path="/signup" element={<Signup />}></Route> */}
      <Route path="/mainspace" element={<Mainspace />}></Route>
      <Route path="/projects" element={<Projects />}></Route>
      <Route path="/workspace" element={<Workspace />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/profileposts" element={<Profilepost />}></Route>
      <Route path="/team" element={<Team />}></Route>
    </Routes></>

  );
}

export default App;
