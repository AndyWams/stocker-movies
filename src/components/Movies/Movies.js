import React, { useState } from "react";
import Button from "../Button/Button";
import Favorite from "../Favorite/Favorite";
import Pagination from "../Pagination/Pagination";
import Paginate from "../Utils/Paginate";
const Movies = ({
  movies,
  onDelete,
  currentPage,
  onToggleLiked,
  OnHandlePageChange,
}) => {
  const [pageSize] = useState(4);
  const allmovies = Paginate(movies, currentPage, pageSize);
  return (
    <React.Fragment>
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
        itemCount={movies.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={OnHandlePageChange}
      />
    </React.Fragment>
  );
};

export default Movies;
