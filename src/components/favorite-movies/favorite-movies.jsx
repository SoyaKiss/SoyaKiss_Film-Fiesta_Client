import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MiniMovieCard } from "../mini-movie-card/mini-movie-card";

export const FavoriteMovies = ({ favoriteMovies, movies }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h3>Favorite Movies</h3>
          <Row>
            {favoriteMovies.length === 0 ? (
              <Col>No favorite movies added.</Col>
            ) : (
              favoriteMovies.map((movieId) => {
                const movie = movies.find((m) => m._id === movieId);
                return (
                  <Col key={movieId} xs={12} sm={6} md={4} lg={3}>
                    <MiniMovieCard movie={movie} />
                  </Col>
                );
              })
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
