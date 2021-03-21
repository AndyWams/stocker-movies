import React, { useState, useEffect } from "react";
const FilterList = ({ textProperty, selectedGenre, onHandleGenreSelect }) => {
  const [genres, setGenres] = useState([]);

  //Lifecycle method
  useEffect(() => {
    const getGenres = async () => {
      const genresFromServer = await fetchGenres();
      const allGenres = [{ name: "All Genres" }, ...genresFromServer];
      setGenres(allGenres);
    };
    getGenres();
  }, []);

  //Get genres
  const fetchGenres = async () => {
    const res = await fetch("http://localhost:5000/genres");
    const data = await res.json();
    return data;
  };

  return (
    <div className="list-group">
      <div>
        {genres.map((item) => {
          return (
            <button
              key={item[textProperty]}
              type="button"
              className={
                item === selectedGenre
                  ? "list-group-item list-group-item-action active"
                  : "list-group-item list-group-item-action"
              }
              aria-current="true"
              onClick={() => onHandleGenreSelect(item)}
            >
              {item[textProperty]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

FilterList.defaultProps = {
  textProperty: "name",
  valueProperty: "id",
};

export default FilterList;
