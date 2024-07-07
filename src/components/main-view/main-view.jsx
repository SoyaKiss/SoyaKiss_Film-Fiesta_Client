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
    if (user && user.Username) {
      const fetchFavorites = async () => {
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
          const data = await response.json();
          setFavorites(data);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };

      fetchFavorites();
    }
  }, [token, user]);

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

  const handleFavoriteToggle = async (movie) => {
    if (!movie._id || !movie.Title || !movie.ImageURL) {
      console.error("Invalid movie object", movie);
      return;
    }

    const isFavorite = favorites.some((fav) => fav._id === movie._id);
    const url = `https://film-fiesta-2f42541ec594.herokuapp.com/Users/${user.Username}/favorites/${movie._id}`;
    const method = isFavorite ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setFavorites(updatedUser.favoriteMovies);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const handleRemoveFavorite = async (movie) => {
    const url = `https://film-fiesta-2f42541ec594.herokuapp.com/Users/${user.Username}/favorites/${movie._id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setFavorites(updatedUser.favoriteMovies);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleUserUpdated = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleMovieClick = (movieId) => {
    setScrollPosition(mainViewRef.current.scrollTop);
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
      <Container fluid className="main-view-container" ref={mainViewRef}>
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
              user ? (
                <ProfileView
                  user={user}
                  token={token}
                  onUserUpdated={handleUserUpdated}
                />
              ) : (
                <div>Loading...</div>
              )
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
