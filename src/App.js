import './App.css';

import "bootswatch/dist/spacelab/bootstrap.min.css";
import axios from "axios";

import { useState, useEffect} from 'react';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Tester from './tester';
import Homepage from './homepage';

function App() {
  useEffect(() => {
    getVal();
  }, []);

  return (
      <div className="App">
        
        <Routes>
        {
          <Route path="/cats" element={<Tester/>} />
        }
        </Routes>
        <Homepage />

      </div>
  );
}

function getVal() {
  let data;
  axios.get("http://localhost:8000/backStuff/")
          .then((val) => {
              data = val.data;
              alert(data);
          })
          .catch((err) => {});
  return data;
}

export default App;
