import React, { useState } from "react";
import Button from "../Button/Button";
import Favorite from "../Favorite/Favorite";
import Pagination from "../Pagination/Pagination";
import Paginate from "../Utils/Paginate";
import _ from "lodash";
const Movies = ({
  movies,
  onDelete,
  currentPage,
  selectedGenre,
  onToggleLiked,
  OnHandlePageChange,
  onSort,
  sortColumn,
}) => {
  const [pageSize] = useState(4);
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
            <th scope="col" onClick={() => onSort("id")}>
              #
            </th>
            <th scope="col" onClick={() => onSort("title")}>
              Title
            </th>
            <th scope="col" onClick={() => onSort("genre")}>
              Genre
            </th>
            <th scope="col" onClick={() => onSort("stock")}>
              Stock
            </th>
            <th scope="col" onClick={() => onSort("rating")}>
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
