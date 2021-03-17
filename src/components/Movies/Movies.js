import React, { useState } from "react";
import Button from "../Button/Button";
import Favorite from "../Favorite/Favorite";
import Pagination from "../Pagination/Pagination";
import Paginate from "../Utils/Paginate";
const Movies = ({
  movies,
  onDelete,
  currentPage,
  selectedGenre,
  onToggleLiked,
  OnHandlePageChange,
}) => {
  const [pageSize] = useState(4);
  const filtered =
    selectedGenre && selectedGenre.id
      ? movies.filter((movie) => movie.genre === selectedGenre.name)
      : movies;
  const allmovies = Paginate(filtered, currentPage, pageSize);
  return (
    <React.Fragment>
      <p>
        showing {filtered.length} <strong>movies</strong> in the database
      </p>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rating</th>
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
                  <Favorite movie={movie} onToggle={onToggleLiked} />
                </td>
                <td>
                  <Button
                    bgcolor="btn--danger btn-md"
                    btntext="Delete"
                    onClick={() => onDelete(movie.id)}
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
        onPageChange={OnHandlePageChange}
      />
    </React.Fragment>
  );
};

export default Movies;
