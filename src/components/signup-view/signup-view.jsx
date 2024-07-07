import React, { useState } from "react";
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
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
      fullName: fullName,
      Birthday: birthday,
    };

    fetch("https://film-fiesta-2f42541ec594.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Network response was not ok: ${text}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.user && data.token) {
          onLoggedIn(data.user, data.token);
        } else {
          alert("Failed to signup. Please try again.");
        }
      })
      .catch((e) => {
        console.error("Signup error:", e);
        alert(`Something went wrong: ${e.message}`);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="signup-card">
            <Card.Body>
              <Card.Title className="text-left">Sign Up</Card.Title>
              <Form onSubmit={handleSubmit} className="signup-form">
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
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
                <br />
                <Button
                  variant="outline-secondary"
                  type="submit"
                  className="signup-button"
                >
                  Submit
                </Button>
                <Button
                  onClick={onLoginClicked}
                  variant="outline-primary"
                  className="login-button"
                >
                  Log In Here
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
