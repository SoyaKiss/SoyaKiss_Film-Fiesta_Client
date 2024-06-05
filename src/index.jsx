import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import "bootstrap/scss/bootstrap.scss";
import Container from "react-bootstrap/Container";
import "./index.scss";

const FilmFiestaApplication = () => {
  return (
    <Container style={{ border: "1px solid red" }}>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MainView />);
