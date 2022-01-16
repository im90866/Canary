import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import {Link} from 'react-router-dom'

export default function Login(){
    return(
        <div style={{width:'50%', margin:'auto', textAlign:'center'}}>

            <Form>
                <Form.Group>
                    <Form.Label htmlFor="inputPassword6">Username</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Username" />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="inputPassword6">Password</Form.Label>
                    <Form.Control size="sm" type="password" placeholder="Password"  />
                </Form.Group>
            </Form>
            <br></br>
            <Button style={{width:'100%'}} size="m" variant="light"> Login </Button>
            <br></br>
            <Link to="/"> Forgot Password? </Link>
            <h3> OR </h3>
            <Link to='/signup'> Sign up </Link>
        </div>
    )
}