
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Componenets/Home/Home';
import Login from "./Componenets/Login/Login"
import Post from './Componenets/Post/Post';
import Signup from './Componenets/Signup/Signup';

import Projects from './Componenets/Projects/Projects';
  
function App() {
  return (  
    <Routes>
 <Route path="/" element={<Login />}></Route>
 <Route path="/home" element={<Home />}></Route>
 <Route path="/signup" element={<Signup />}></Route>
 
 <Route path="/projects" element={<Projects/>}></Route>
 </Routes> 

  );
}

export default App;
