import './tester.css';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import "bootswatch/dist/spacelab/bootstrap.min.css";
import { Route } from 'react-router-dom';

function Tester() {
  return (
   <h1> Hello </h1>
  );
}

const catsPage = () => (
  <div>
    <h1>CATS!</h1>
  </div>
)

export default Tester;
