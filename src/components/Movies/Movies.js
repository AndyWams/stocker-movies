import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import Pagination from "../Pagination/Pagination";
import Paginate from "../Utils/Paginate";
import MovieTable from "../Partials/MovieTable";
import { Link } from "react-router-dom";
import { GetMovies, DeleteMovie } from "../../service/movieService";
import _ from "lodash";

const Movies = ({ selectedGenre, setSelectedGenre }) => {
  const [pageSize] = useState(5);
  const [movies, setMovies] = useContext(MovieContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({
    path: "_id",
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
    const { data } = await GetMovies();
    return data;
  };

  //Get Movie
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
  const handleSort = (sortcolumn) => {
    setSortColumn(sortcolumn);
  };

  //Handle Page Change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //Delete Task
  const handleDelete = async (id) => {
    console.log(id);

    await DeleteMovie(id);
    setMovies(movies.filter((movie) => movie._id !== id));
  };

  //Filter/Sort/Paginate
  const getPageData = () => {
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((movie) => movie.genre.name === selectedGenre.name)
        : movies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const allmovies = Paginate(sorted, currentPage, pageSize);
    return {
      totalCount: filtered.length,
      data: allmovies,
    };
  };

  const { totalCount, data: allmovies } = getPageData();
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between mb-4">
        <h3>All Movies</h3>
        <Link to="create-movie" className="btn--link">
          Create Movies
        </Link>
      </div>
      <p>
        showing {totalCount} <strong>movies</strong> in the database
      </p>
      {/* <Searchbox value={searchQuery} onChange={handleSearch} /> */}
      <MovieTable
        onDelete={handleDelete}
        onToggleLike={handleToggleLiked}
        onHandleSort={handleSort}
        allmovies={allmovies}
        sortColumn={sortColumn}
        onSort={handleSort}
      />
      <Pagination
        itemCount={totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
};

export default Movies;
