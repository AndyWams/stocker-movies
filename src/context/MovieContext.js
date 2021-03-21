import React, { createContext, useState } from "react";
export const MovieContext = createContext();
MovieContext.displayName = "MovieContext";

export const MovieProvider = (props) => {
  const [movies, setMovies] = useState([]);

  return (
    <MovieContext.Provider value={[movies, setMovies]}>
      {props.children}
    </MovieContext.Provider>
  );
};
