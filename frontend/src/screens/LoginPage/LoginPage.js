import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import './LoginPage.css';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions' 

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state)=> state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate('/mynotes');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));

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
