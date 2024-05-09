import { createRoot } from "react-dom/client";
import "./index.scss";
let FilmFiestaApplication = () => {
  return (
    <div className="film-fiesta">
      <div>Good Day Mate</div>
    </div>
  );
};

let container = document.querySelector("#root");
let root = createRoot(container);

root.render(<FilmFiestaApplication />);
