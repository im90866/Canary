import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import {Link} from 'react-router-dom'

export default function SignUp(){
    return(
        <div style={{width:'50%', margin:'auto', textAlign:'center'}}>

            <Form>
                <Form.Group>
                    <Form.Label htmlFor="inputPassword6">First Name</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="inputPassword6">Last Name</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Last Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="inputPassword6">Date of Birth</Form.Label>
                    <Form.Control size="sm" type="date" placeholder="Date of Birth" />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="inputPassword6">Username</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="inputPassword6">Email</Form.Label>
                    <Form.Control size="sm" type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="inputPassword6">Password</Form.Label>
                    <Form.Control size="sm" type="password" placeholder="Password"  />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="inputPassword6">Re-type Password</Form.Label>
                    <Form.Control size="sm" type="password" placeholder="Re-type Password"  />
                </Form.Group>
            </Form>
            <br></br>
            <Button style={{width:'100%'}} size="m" variant="light"> Sign Up </Button>
        </div>
    )
}