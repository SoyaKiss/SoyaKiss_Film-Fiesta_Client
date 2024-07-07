import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import heartOutline from "../../assets/heart-outline.png";
import heartFilled from "../../assets/heart-filled.png";
import "./movie-card.scss";

export const MovieCard = ({ movie, onFavoriteToggle, isFavorite }) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  const handleFavoriteClick = () => {
    setIsFavoriteState(!isFavoriteState);
    onFavoriteToggle(movie);
  };

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
          <Link to={`/movies/${movie._id}`} state={{ from: "main" }}>
            <Button variant="outline-secondary" className="more-button">
              More
            </Button>
          </Link>
          <Button
            variant="outline-secondary"
            onClick={handleFavoriteClick}
            className="favorite-button"
          >
            <img
              src={isFavoriteState ? heartFilled : heartOutline}
              alt="Favorite"
              className="heart-icon"
            />
          </Button>
        </div>
      </div>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
