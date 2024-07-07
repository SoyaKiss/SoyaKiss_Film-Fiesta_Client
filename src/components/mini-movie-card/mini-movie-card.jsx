import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./mini-movie-card.scss";

export const MiniMovieCard = ({ movie, onRemoveFavorite }) => {
  return (
    <Card className="mini-movie-card-container">
      <div className="mini-movie-image-container">
        <Card.Img
          variant="top"
          src={movie.ImageURL}
          className="mini-movie-image"
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mini-movie-title">{movie.Title}</Card.Title>
        <div className="mini-movie-buttons mt-auto">
          <Link to={`/movies/${movie._id}`} state={{ from: "favorites" }}>
            <Button variant="outline-secondary" className="more-button">
              More
            </Button>
          </Link>
          <Button
            variant="outline-danger"
            className="remove-button"
            onClick={() => onRemoveFavorite(movie)}
          >
            Remove
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MiniMovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
};
