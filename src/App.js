import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Componenets/Home/Home';
import Login from "./Componenets/Login/Login"
import Post from './Componenets/Post/Post';
import Signup from './Componenets/Signup/Signup'
import Update from './Componenets/Update/Update';
import Upload from './Upload';
import Workspace from './Componenets/Workspace/Workspace';
import { useEffect } from "react"
import CSRFToken from './Componenets/Auth/CSRF.js'
import axios from "axios"
import Projects from './Componenets/Projects/Projects';
import Profile from './Componenets/Profile/Profile';
import Profilepost from './Componenets/Profileposts/Profilepost';
import Mainspace from './Componenets/Mainspace/Mainspace'
import Collaboration from './Componenets/Collaboration/Collaboration';
import Editprofile from './Componenets/Editprofile/Editprofile';
import ChangePassword from './Componenets/ChangePassword/ChangePassword';

function App() {
  useEffect(() => {
    //axios.get("http://localhost:8000/delete")
    //axios.get("http://localhost:8000/print")
  }, [])
  return (
    <>
    <CSRFToken />
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/mainspace" element={<Mainspace />}></Route>
      <Route path="/projects" element={<Projects />}></Route>
      <Route path="/update" element={<Update />}></Route>
      <Route path="/workspace/:id" element={<Workspace />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/profileposts" element={<Profilepost />}></Route>
      <Route path="/upload" element={<Upload />}></Route>
    </Routes></>

  );
}

export default App;
