import React, { useState, useEffect, useContext } from "react";
import Button from "../Button/Button";
import Favorite from "../Favorite/Favorite";
import Pagination from "../Pagination/Pagination";
import Paginate from "../Utils/Paginate";
import { MovieContext } from "../../context/MovieContext";
import _ from "lodash";

const Movies = ({ selectedGenre }) => {
  const [pageSize] = useState(4);
  const [movies, setMovies] = useContext(MovieContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({
    path: "id",
    order: "asc",
  });

  //Lifecycle method
  useEffect(() => {
    const getMovies = async () => {
      const moviesFromServer = await fetchMovies();
      setMovies(moviesFromServer);
    };
    getMovies();
  }, [setMovies]);

  //Get Movies
  const fetchMovies = async () => {
    const res = await fetch("http://localhost:5000/movies");
    const data = await res.json();
    return data;
  };

  //Get task
  const getMovie = async (id) => {
    const res = await fetch(`http://localhost:5000/movies/${id}`);
    const data = await res.json();
    return data;
  };

  //Toggle Liked
  const handleToggleLiked = async (id) => {
    const movieToToggle = await getMovie(id);
    let updateMovie = { ...movieToToggle, liked: !movieToToggle.liked };

    const res = await fetch(`http://localhost:5000/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateMovie),
    });

    const data = await res.json();

    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, liked: data.liked } : movie
      )
    );
  };
  //Handle Sort
  const handleSort = (path) => {
    setSortColumn({ path, order: "asc" });
  };

  //Handle Page Change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //Delete Task
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/movies/${id}`, {
      method: "DELETE",
    });
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const filtered =
    selectedGenre && selectedGenre.id
      ? movies.filter((movie) => movie.genre === selectedGenre.name)
      : movies;
  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
  const allmovies = Paginate(sorted, currentPage, pageSize);

  return (
    <React.Fragment>
      <h3>All Movies</h3>
      <p>
        showing {filtered.length} <strong>movies</strong> in the database
      </p>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col" onClick={() => handleSort("id")}>
              #
            </th>
            <th scope="col" onClick={() => handleSort("title")}>
              Title
            </th>
            <th scope="col" onClick={() => handleSort("genre")}>
              Genre
            </th>
            <th scope="col" onClick={() => handleSort("stock")}>
              Stock
            </th>
            <th scope="col" onClick={() => handleSort("rating")}>
              Rating
            </th>
            <th scope="col">Liked</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allmovies.map((movie) => {
            return (
              <tr key={movie.id}>
                <th scope="row">{movie.id}</th>
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                <td>{movie.stock}</td>
                <td>{movie.rating}</td>
                <td>
                  <Favorite movie={movie} onToggle={handleToggleLiked} />
                </td>
                <td>
                  <Button
                    bgcolor="btn--danger btn-md"
                    btntext="Delete"
                    onClick={() => handleDelete(movie.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        itemCount={filtered.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
};

export default Movies;
