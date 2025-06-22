import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from '../../components/ErrorMessage';
import Loading from "../../components/Loading";
import axios from 'axios';
// import "./RegisterPage.css";

const RegisterPage = () => {

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [picMessage, setPicMessage] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
        setMessage(`Password doesn't match`);
    } else {
        setMessage(null);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            setLoading(true);
            const { data } = await axios.post("/users", {name, pic , email, password}, config);
            setLoading(false);
            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            setError(error.response.data.message);
        }

    }
    console.log(name, email);
    
  }

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        { error && <ErrorMessage variant='danger'>{error}</ErrorMessage> }
        { message && <ErrorMessage variant='danger'>{message}</ErrorMessage> }
        { loading && <Loading/>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=> setConfirmPassword(e.target.value)}
            />
          </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterPage;