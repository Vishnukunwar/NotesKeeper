import React, { useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import './LoginPage.css';
import axios from'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        setLoading(true);

        const response = await axios.post('/users/login', { email, password }, config)
        console.log(response.data);

        localStorage.setItem('userInfo', JSON.stringify(response.data));

        setLoading(false);
        
    } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
    }
  }

  return (
    <MainScreen title="LOGIN">
        <div className='loginContainer'>
            { error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            { loading && <Loading/> }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='fromBasicEmail' className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='fromBasicEmail' className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New customer ? <Link to='/register' >Register here</Link>
                </Col>
            </Row>
        </div>
    </MainScreen>
  )
}

export default LoginPage
