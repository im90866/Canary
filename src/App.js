
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Componenets/Home/Home';
import Login from "./Componenets/Login/Login"
import Post from './Componenets/Post/Post';
import Signup from './Componenets/Signup/Signup'
import Update from './Componenets/Update/Update';
import Workspace from './Componenets/Workspace/Workspace';
import { useEffect } from "react"
import axios from "axios"
import Projects from './Componenets/Projects/Projects';

function App() {
  useEffect(() => {
    //axios.get("http://localhost:8000/delete")
    //axios.get("http://localhost:8000/print")
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>

      <Route path="/projects" element={<Projects />}></Route>
      <Route path="/update" element={<Update/>}></Route>
      <Route path="/workspace" element={<Workspace/>}></Route>
    </Routes>

  );
}

export default App;
