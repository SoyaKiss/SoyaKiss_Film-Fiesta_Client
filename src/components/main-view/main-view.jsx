import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(savedUser);
      fetchMovies(token);
    }
  }, [token]);

  const fetchMovies = (token) => {
    fetch("https://film-fiesta-2f42541ec594.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            ImageURL: movie.ImageURL,
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            console.log("Logged in user:", user);
            console.log("Received token:", token);
            setUser(user);
            setToken(token);
            localStorage.setItem("user", user);
            localStorage.setItem("token", token);
            fetchMovies(token);
          }}
        />
        or
        <SignupView />
      </>
    );
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
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button
        onClick={() => {
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
      >
        Logout
      </button>
    </div>
  );
};
