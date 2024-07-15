import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn, onSignUpClicked }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://film-fiesta-2f42541ec594.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Network response was not ok: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.user && data.token) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("Failed to login. Please try again.");
        }
      })
      .catch((e) => {
        console.error("Login error:", e);
        alert(`Something went wrong: ${e.message}`);
      });
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="login-card">
            <Card.Body>
              <Card.Title className="text-left">Login</Card.Title>
              <Form onSubmit={handleSubmit} className="login-form">
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
                <br />
                <Button
                  variant="outline-secondary"
                  type="submit"
                  className="login-button"
                >
                  Submit
                </Button>
                <Button
                  onClick={onSignUpClicked}
                  variant="outline-primary"
                  type="button"
                  className="sign-up-button"
                >
                  Sign Up Here
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onSignUpClicked: PropTypes.func.isRequired,
};
