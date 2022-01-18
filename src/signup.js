import './signup.css';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import "bootswatch/dist/spacelab/bootstrap.min.css";

import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Tester from './tester';
import Homepage from './homepage';

function Signup() {
  return (
    <form>
        <div class="container" > 
            <h1 > CANARY </h1>  
            <input type="text" placeholder="Email Address" name="email" required> </input>
            <input type="text" placeholder="First Name" name="first" required> </input>
			<input type="text" placeholder="Last Name" name="last" required> </input>
			<input type="text" placeholder="Username" name="username" required> </input>
				<input type="text" placeholder="Date of Birth" name="dob" required></input>
			<input type="password" placeholder="Password" name="password" required></input>
            <button type="submit"><a href="login.html">Sign Up</a></button> 
        </div> 
    </form>   
  );
}


export default Signup;
