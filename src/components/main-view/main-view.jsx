import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../signup-view/signup-view";
import { Container, Row, Col } from "react-bootstrap";
import "./main-view.scss";

export const MainView = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    if (token) {
      const fetchMovies = async () => {
        try {
          const response = await fetch(
            "https://film-fiesta-2f42541ec594.herokuapp.com/movies",
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
          const data = await response.json();
          setMovies(data);
        } catch (error) {
          console.error("Error fetching movies:", error);
          setError(error.message);
        }
      };

      fetchMovies();
    }
  }, [token]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleLoggedIn = (user, token) => {
    setToken(token);
    setUser(user);
    setShowLogin(false);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLoggedOut = () => {
    setToken(null);
    setUser(null);
    setShowLogin(true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const handleSignUpClicked = () => {
    setShowLogin(false);
  };

  const handleLoginClicked = () => {
    setShowLogin(true);
  };

  if (!token) {
    return showLogin ? (
      <LoginView
        onLoggedIn={handleLoggedIn}
        onSignUpClicked={handleSignUpClicked}
      />
    ) : (
      <SignUpView
        onLoggedIn={handleLoggedIn}
        onLoginClicked={handleLoginClicked}
      />
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>This list is empty.</div>;
  }

  return (
    <Container fluid>
      <Row>
        {movies.map((movie) => (
          <Col className="mb-5" key={movie._id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} onMovieClick={handleMovieClick} />
          </Col>
        ))}
        <button className="custom-button" onClick={handleLoggedOut}>
          Logout
        </button>
      </Row>
    </Container>
  );
};
