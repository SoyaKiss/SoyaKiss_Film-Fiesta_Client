import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./mini-movie-card.scss";

export const MiniMovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    if (movie?._id) {
      navigate(`/movies/${movie._id}`);
    }
  };

  return (
    <Card
      className="mini-movie-card"
      style={{ width: "12rem", margin: "10px" }}
    >
      <div className="mini-card-content">
        <div className="mini-image-container">
          <Card.Img
            variant="top"
            src={movie.ImageURL}
            className="mini-image"
            onError={(e) => {
              e.target.src = "placeholder-image-url";
              e.target.onerror = null;
            }}
          />
        </div>
      </div>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button
          variant="outline-secondary"
          className="mini-button"
          onClick={handleMoreClick}
        >
          More...
        </Button>
      </Card.Body>
    </Card>
  );
};
