import React, { useState, useEffect, useRef } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../signup-view/signup-view";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { FavoriteMovies } from "../favorite-movies/favorite-movies";
import "./main-view.scss";

export const MainView = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const mainViewRef = useRef(null);
  const navigate = useNavigate();

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
          const validMovies = data.filter(
            (movie) => movie._id && movie.Title && movie.ImageURL
          );
          setMovies(validMovies);
        } catch (error) {
          console.error("Error fetching movies:", error);
          setError(error.message);
        }
      };

      fetchMovies();
    }
  }, [token]);

  useEffect(() => {
    // Restore scroll position when component mounts
    if (mainViewRef.current) {
      mainViewRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

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

  const handleFavoriteToggle = (movie) => {
    if (!movie._id || !movie.Title || !movie.ImageURL) {
      console.error("Invalid movie object", movie);
      return;
    }

    const isFavorite = favorites.some((fav) => fav._id === movie._id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav._id !== movie._id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const handleRemoveFavorite = (movie) => {
    setFavorites(favorites.filter((fav) => fav._id !== movie._id));
  };

  const handleUserUpdated = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleMovieClick = (movieId) => {
    setScrollPosition(mainViewRef.current.scrollTop); // Store the scroll position
    navigate(`/movies/${movieId}`);
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.Title &&
      movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <>
      <NavigationBar
        user={user}
        onLoggedOut={handleLoggedOut}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Container fluid style={{ paddingTop: "150px" }} ref={mainViewRef}>
        <Routes>
          <Route
            path="/"
            element={
              <Row>
                {filteredMovies.length === 0 ? (
                  <div>No movies found.</div>
                ) : (
                  filteredMovies.map((movie) => (
                    <Col
                      className="mb-5"
                      key={movie._id}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                    >
                      <MovieCard
                        movie={movie}
                        onFavoriteToggle={handleFavoriteToggle}
                        isFavorite={favorites.some(
                          (fav) => fav._id === movie._id
                        )}
                        onMovieClick={() => handleMovieClick(movie._id)}
                      />
                    </Col>
                  ))
                )}
              </Row>
            }
          />
          <Route
            path="/profile"
            element={
              <ProfileView
                user={user}
                token={token}
                onUserUpdated={handleUserUpdated}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoriteMovies
                favorites={favorites}
                onRemoveFavorite={handleRemoveFavorite}
              />
            }
          />
          <Route
            path="/movies/:movieId"
            element={<MovieView movies={movies} />}
          />
        </Routes>
      </Container>
      <div className="fixed-footer">
        <Button
          variant="outline-secondary"
          onClick={handleLoggedOut}
          className="footer-logout-button"
        >
          Logout
        </Button>
      </div>
    </>
  );
};
