import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import "./main-view.scss";

const MovieDetail = ({ movies, onAddToFavorites }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return <MovieView movie={movie} onAddToFavorites={onAddToFavorites} />;
};

export const MainView = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchMovies = async () => {
        try {
          console.log("Token received in MainView:", token);
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
          console.log("Movies fetched successfully:", data);
          setMovies(data);
        } catch (error) {
          console.error("Error fetching movies:", error);
          setError(error.message);
        }
      };

      fetchMovies();
    }
  }, [token]);

  const handleAddToFavorites = async (movie) => {
    try {
      const response = await fetch(
        `https://film-fiesta-2f42541ec594.herokuapp.com/Users/${user.Username}/favorites/${movie.Title}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("Updated user:", updatedUser);
      alert(`${movie.Title} has been added to your favorites.`);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites. Please try again.");
    }
  };

  const handleLoggedIn = (authData) => {
    setToken(authData.token);
    setUser(authData.user);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
  };

  const handleLoggedOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <BrowserRouter>
      <NavigationBar />
      <Container fluid>
        <Row className="justify-content-center mt-5">
          <Routes>
            <Route
              path="/signup"
              element={
                token ? (
                  <Navigate to="/" />
                ) : (
                  <Col xs={12} md={5}>
                    <SignUpView onLoggedIn={handleLoggedIn} />
                  </Col>
                )
              }
            />
            <Route
              path="/login"
              element={
                token ? (
                  <Navigate to="/" />
                ) : (
                  <Col xs={12} md={5}>
                    <LoginView onLoggedIn={handleLoggedIn} />
                  </Col>
                )
              }
            />
            <Route
              path="/profile"
              element={
                token ? (
                  <ProfileView user={user} onLoggedOut={handleLoggedOut} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                !token ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col xs={12} md={8}>
                    <MovieDetail
                      movies={movies}
                      onAddToFavorites={handleAddToFavorites}
                    />
                  </Col>
                )
              }
            />
            <Route
              path="/"
              element={
                !token ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-4"
                        key={movie._id}
                      >
                        <MovieCard
                          movie={movie}
                          onAddToFavorites={handleAddToFavorites}
                        />
                      </Col>
                    ))}
                    <Col xs={12} className="text-center mt-4">
                      <Button
                        className="logout-button inline-button"
                        variant="outline-secondary"
                        size="md"
                        onClick={handleLoggedOut}
                      >
                        Logout
                      </Button>
                    </Col>
                  </>
                )
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
