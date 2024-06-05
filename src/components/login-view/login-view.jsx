import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

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
          alert("No such user");
        }
      })
      .catch((e) => {
        console.error("Login error:", e);
        alert("Something went wrong");
      });
  };

  return (
    <Container fluid>
      <Row xs={1} sm={2} md={3} lg={4} xl={4}>
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
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <br></br>
            <br></br>
            <Button
              onClick={onSignUpClicked}
              variant="secondary"
              type="Don't have an account?"
            >
              Sign Up Here
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};
