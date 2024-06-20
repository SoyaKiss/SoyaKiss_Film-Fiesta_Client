import React from "react";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImageURL} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
