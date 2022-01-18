
import './App.css';
 import { Route, Routes } from 'react-router-dom';
// import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
// import { Container } from 'react-bootstrap';
// import { Form, FormControl } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
// import "bootswatch/dist/spacelab/bootstrap.min.css";
 import Home from './Componenets/Home/Home';
import Login from "./Componenets/Login/Login"
import Signup from './Componenets/Signup/Signup';

function App() {
  return (
    <div className="App">
      {/* <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Canary</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
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
      </Navbar> */}
   <Routes>
<Route path="/canary" element={<Login />}></Route>
<Route path="/canary/home" element={<Home />}></Route>
 <Route path="/canary/signup" element={<Signup />}></Route>
</Routes> 
    </div> 
  );
}

export default App;
