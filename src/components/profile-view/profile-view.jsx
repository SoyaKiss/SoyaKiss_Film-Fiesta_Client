import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { MiniMovieCard } from "../mini-movie-card/mini-movie-card";

export const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
        setFavoriteMovies(userData.favoriteMovies);
        setEditedUser({ ...userData });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitEditedUserData(editedUser);
      setUser({ ...editedUser });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleDeregister = async () => {
    try {
      await deregisterUser();
      alert("Your account has been successfully deregistered.");
    } catch (error) {
      console.error("Error deregistering user:", error);
      alert("Failed to deregister your account. Please try again.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>User Profile</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="Username"
                value={editedUser.Username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={editedUser.Email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                name="Birthday"
                value={editedUser.Birthday}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            <Button
              variant="danger"
              onClick={handleDeregister}
              style={{ marginLeft: "10px" }}
            >
              Deregister
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Favorite Movies</h3>
          <Row>
            {favoriteMovies.map((movie) => (
              <MiniMovieCard key={movie._id} movie={movie} />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const fetchUserData = async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const response = await fetch(
      `https://film-fiesta-2f42541ec594.herokuapp.com/Users/${user.Username}/favorites`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const favoriteMovies = await response.json();
    return {
      ...user,
      favoriteMovies,
    };
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    return user;
  }
};

const submitEditedUserData = async (userData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `https://film-fiesta-2f42541ec594.herokuapp.com/Users/${userData.Username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

const deregisterUser = async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error deregistering user:", error);
    throw error;
  }
};
