import React from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const navigate = useNavigate();
  const location = useLocation();

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleBackClick = () => {
    window.scrollTo(0, 0);
    if (location.state && location.state.from === "favorites") {
      navigate("/favorites");
    } else {
      navigate("/");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center movie-view-container">
      <Row className="justify-content-center">
        <Card className="movie-card-container">
          <Card.Img
            variant="top"
            src={movie.ImageURL}
            className="movie-image-container"
          />
          <Card.Body>
            <Card.Title className="movie-title">{movie.Title}</Card.Title>
            <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
            <Card.Text>Main Actor: {movie.mainActor.Name}</Card.Text>
            <Card.Text>
              Supporting Actor: {movie.supportingActor.Name}
            </Card.Text>
            <Card.Text>Description: {movie.Description}</Card.Text>
          </Card.Body>
          <div className="movie-back-button-container">
            <Button
              variant="outline-secondary"
              onClick={handleBackClick}
              className="movie-back-button"
            >
              Back
            </Button>
          </div>
        </Card>
      </Row>
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImageURL: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      mainActor: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      supportingActor: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
