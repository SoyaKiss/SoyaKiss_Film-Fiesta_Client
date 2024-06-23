import PropTypes from "prop-types";
import React from "react";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" style={{ width: "16rem" }}>
      <div className="card-content">
        <div className="image-container">
          <Card.Img variant="top" src={movie.ImageURL} className="image" />
        </div>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
        <div className="button-container">
          <Button
            variant="outline-secondary"
            onClick={() => onMovieClick(movie)}
            className="button"
          >
            More ...
          </Button>
        </div>
      </div>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
