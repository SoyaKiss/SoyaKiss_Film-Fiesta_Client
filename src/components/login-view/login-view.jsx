import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link for navigation

import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login response:", data);
        if (data.user && data.token) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.token);
        } else {
          setError("Invalid username or password.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
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
            {error && <p className="text-danger">{error}</p>}
            <Button variant="primary" type="submit" className="login-button">
              Login
            </Button>
            {/* Update the Sign Up button to navigate to the Sign Up page */}
            <Link to="/signup" className="sign-up-button">
              Sign Up Here
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
