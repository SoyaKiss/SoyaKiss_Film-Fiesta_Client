import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import { MiniMovieCard } from "../mini-movie-card/mini-movie-card";

export const FavoriteMovies = ({ favorites, onRemoveFavorite }) => {
  const validFavorites = favorites.filter(
    (movie) => movie._id && movie.Title && movie.ImageURL
  );
  return (
    <Container>
      <Row>
        {validFavorites.map((movie) => (
          <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
            <MiniMovieCard movie={movie} onRemoveFavorite={onRemoveFavorite} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

FavoriteMovies.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      ImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
};
