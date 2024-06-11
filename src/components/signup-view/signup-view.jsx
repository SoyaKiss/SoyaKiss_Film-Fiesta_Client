import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./signup-view.scss";

export const SignUpView = ({ onLoggedIn, onLoginClicked }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      FullName: fullName,
      Birthday: birthday,
    };

    // Handle signup logic here
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit" className="submit-button">
                Submit
              </Button>
              <Link to="/login" className="login-button">
                Login Here
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
