import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleMoreClick = () => {
    if (movie?._id) {
      // Check if 'movie' and 'movie._id' are defined
      navigate(`/movies/${movie._id}`);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="h-100" style={{ width: "16rem" }}>
      <div className="card-content">
        <div className="image-container">
          {/* Use optional chaining to safely access 'movie.ImageURL' */}
          <Card.Img variant="top" src={movie?.ImageURL} className="image" />
        </div>
      </div>
      <Card.Body>
        {/* Use optional chaining to safely access 'movie.Title' and 'movie.Description' */}
        <Card.Title>{movie?.Title}</Card.Title>
        <Card.Text>{movie?.Description}</Card.Text>
      </Card.Body>
      <div className="button-container">
        <Button
          variant={isFavorite ? "danger" : "primary"}
          className="button"
          onClick={toggleFavorite}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
        <Button
          variant="outline-secondary"
          className="button"
          onClick={handleMoreClick}
        >
          More...
        </Button>
      </div>
    </Card>
  );
};
