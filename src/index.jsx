import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

import "bootstrap/scss/bootstrap.scss";
import "./index.scss";

const FilmFiestaApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<FilmFiestaApplication />);
