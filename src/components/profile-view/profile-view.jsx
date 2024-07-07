import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./profile-view.scss";

export const ProfileView = ({ user, token, onUserUpdated }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [fullName, setFullName] = useState(user.FullName || "");
  const [birthday, setBirthday] = useState(user.Birthday || "");
  const [updateMessage, setUpdateMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://film-fiesta-2f42541ec594.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: username,
            Password: password,
            Email: email,
            FullName: fullName,
            Birthday: birthday,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedUser = await response.json();
      onUserUpdated(updatedUser);
      setUpdateMessage("Profile has been updated successfully.");
    } catch (error) {
      console.error("Error updating user:", error);
      setUpdateMessage("Error updating profile. Please try again.");
    }
  };

  const handleDeregister = async () => {
    const confirmDeregister = window.confirm(
      "Are you sure you want to deregister? This action cannot be undone."
    );

    if (!confirmDeregister) {
      return;
    }

    try {
      const response = await fetch(
        `https://film-fiesta-2f42541ec594.herokuapp.com/Users/${user.Username}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        window.alert("Your account has been deleted.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload();
      } else {
        const message = await response.text();
        setError(message);
      }
    } catch (err) {
      setError("An error occurred while trying to deregister.");
      console.error("Deregistration error:", err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card style={{ width: "30rem", marginBottom: "20px" }}>
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>
              {updateMessage && <Alert variant="info">{updateMessage}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card style={{ width: "30rem" }}>
            <Card.Body>
              <Card.Title>Not happy with the app?</Card.Title>
              <Card.Text>
                If you wish to deregister from the app, you can click the button
                below. Please note that this action is irreversible.
              </Card.Text>
              <Button
                variant="danger"
                className="mt-3"
                onClick={handleDeregister}
              >
                Deregister
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="fixed-footer">
        <Button
          variant="outline-secondary"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="footer-logout-button"
        >
          Logout
        </Button>
      </div>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    FullName: PropTypes.string,
    Birthday: PropTypes.string,
  }).isRequired,
  token: PropTypes.string.isRequired,
  onUserUpdated: PropTypes.func.isRequired,
};
