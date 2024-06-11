import { Button, Card, Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // This navigates back to the previous page in the history stack
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Card className="movie-card-container">
          <Card.Img
            variant="top"
            src={movie.ImageURL}
            className="movie-image-container"
          />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
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
