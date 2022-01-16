import logo from './logo.svg';
import './App.css';

import Login from './Login'
import Home from './Home'
import SignUp from './SignUp'

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import "bootswatch/dist/spacelab/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom" 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand as={Link} to='/'>Canary</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link to='/'>Home</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" disabled>
                  Link
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/' element={<Home />}/>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
