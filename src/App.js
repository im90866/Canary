import { Route, Routes } from 'react-router-dom';
import './App.css';
 import Home from './newcomponents/Home/Home';

// import Team from './newcomponents/Team/Team'
 import Workspace from './newcomponents/Workspace/Workspace';
 import { useEffect } from "react"
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

function App() {
  useEffect(() => {
    //axios.get("http://localhost:8000/delete")
    //axios.get("http://localhost:8000/print")
  }, [])
  return (
    <>
    <CSRFToken />
    <Routes>
    <Route path="/" element={<Overlay />}></Route>
       <Route path="/home" element={<Home />}></Route>
      {/* <Route path="/signup" element={<Signup />}></Route> */}
      {/* <Route path="/mainspace" element={<Mainspace />}></Route>
      <Route path="/projects" element={<Projects />}></Route> */}
      <Route path="/workspace" element={<Workspace />}></Route>
       <Route path="/profile" element={<Profile />}></Route>
      <Route path="/profile/collaborations" element={<Collaboration/>}></Route>
 <Route path="/profile/profileposts" element={<Profileposts/>}></Route>
 <Route path="/project" element={<Project/>}></Route>
      {/* <Route path="/team" element={<Team />}></Route>  */}
    </Routes></>

  );
}

export default App;
