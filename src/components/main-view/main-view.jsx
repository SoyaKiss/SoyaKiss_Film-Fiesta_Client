import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: "001",
      Title: "The Dark Knight",
      Year: "2008",
      mainActor: {
        Name: "Christian Bale",
        Birthday: "1974-01-30",
      },
      Genre: {
        Name: "Action",
        Description:
          "The action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work.",
      },
      Description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      ImageURL:
        "https://resizing.flixster.com/isBlpcooCvG86jAfX46NOqu-dD4=/fit-in/705x460/v2/https://resizing.flixster.com/pf1B_FfX1A1eWM5joLcx-N4q2Os=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2IyMDk1NTJjLTllMjYtNDE1Yy04Yjk2LTk0NGE0MzZiMGQ2NC53ZWJw",
    },
    {
      _id: "002",
      Title: "The Godfather",
      Year: "1972",
      mainActor: {
        Name: "Marlon Brando",
        Birthday: "1924-04-03",
      },
      Genre: {
        Name: "Crime",
        Description:
          "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.",
      },
      Description:
        "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      ImageURL:
        "https://resizing.flixster.com/I5729h46fM8XXzaYrT6-j8AlMG0=/300x300/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/NowShowing/43177/43177_aa.jpg",
    },
    {
      _id: "003",
      Title: "The Revenant",
      Year: "2015",
      mainActor: {
        Name: "Leonardo DiCaprio",
        Birthday: "1974-11-11",
      },
      Genre: {
        Name: "Action",
        Description:
          "The action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work.",
      },
      Description:
        "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
      ImageURL:
        "https://resizing.flixster.com/_oCXXf24aFzKt-HZUsB9mr3Qt7I=/300x300/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p11598208_k_v8_ac.jpg",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>This list is empty.</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={handleMovieClick}
        />
      ))}
    </div>
  );
};
