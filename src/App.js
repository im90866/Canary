import logo from './logo.svg';
import './App.css';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import "bootswatch/dist/spacelab/bootstrap.min.css";

import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Tester from './tester';

function App() {
  return (
      <div className="App">

        <Routes>
          <Route path="/cats" element={<Tester/>} />
        </Routes>

        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">Canary</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/cats">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3"></NavDropdown.Item>
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
      </div>
  );
}

const catsPage = () => (
  <div>
    <h1>CATS!</h1>
  </div>
)

export default App;
