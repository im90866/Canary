import { Route, Routes } from 'react-router-dom';
import './App.css';
//import Login from './Components/Login/Login';
import Overlay from './newcomponents/Overlay/Overlay';
import Home from './Components/Home/Home';
import Project from './Components/Projects/Project';
import Settingsbar from './Components/Settings/Settingsbar';
import Cardthree from './Components/Settings/Cardthree';
import Cardfour from './Components/Settings/Cardfour';
import Cardfive from './Components/Settings/Cardfive';
import Profile from './Components/Profile/Profile';
import Collaboration from './Components/Collaborations/Collaboration';
import Profileposts from './Components/Profileposts/Profileposts';
import Workspace from './Components/Workspace/Workspace';
import Team from './Components/Team/Team';
import ProjectSettings from './Components/ProjectSettings/ProjectSettings';
import Registrationpage from './Components/Registration page/Registrationpage';

function App() {
  return (
    <div className="App">
  <Routes>
  <Route path="/" element={<Overlay/>}></Route>
 <Route path="/home" element={<Home />}></Route>
  <Route path="/project" element={<Project/>}></Route>
 <Route path="/settings" element={<Settingsbar/>}></Route>
 <Route path="/changepassword" element={<Cardthree/>}></Route>
 <Route path="/blocked" element={<Cardfour/>}></Route>
 <Route path="/delete" element={<Cardfive/>}></Route>
 <Route path="/profile" element={<Profile/>}></Route>
 <Route path="/profile/collaborations" element={<Collaboration/>}></Route>
 <Route path="/profile/profileposts" element={<Profileposts/>}></Route>
 <Route path="/workspace" element={<Workspace/>}></Route>
 <Route path="/team" element={<Team/>}></Route> 
 <Route path="/projectsettings" element={<ProjectSettings/>}></Route> 
 <Route path="/registrationpage" element={<Registrationpage/>}></Route> 

</Routes>
    </div>
  );
}

export default App;
