import { Container, Row, Button } from "react-bootstrap";
import React, { useEffect } from 'react';
import './LandingPage.css'
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('usderInfo');
        if(userInfo){
            navigate('/mynotes');
        }
    }, [navigate]);

  return <div className="main">
    <Container>
        <Row>
            <div className="intro-text">
                <div>
                    <h1 className="title">Welcome to NotesZipper</h1>
                    <p className="subtitle">one safe place for all your notes.</p>
                    <div className="buttonContainer">
                        <a href="/login">
                            <Button size="lg" className="landingbutton">Login</Button>
                        </a>
                        <a href="/register">
                            <Button size="lg" className="landingbutton" variant="outline-primary">Register</Button>
                        </a>
                    </div>
                </div>
            </div>
        </Row>
    </Container>
  </div>
}

export default LandingPage;