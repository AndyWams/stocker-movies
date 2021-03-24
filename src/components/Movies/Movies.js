import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../../context/MovieContext";
import {
  GetMovies,
  DeleteMovie,
  GetMovie,
  UpdateLike,
} from "../../service/movieService";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";
import Paginate from "../Utils/Paginate";
import MovieTable from "../Partials/MovieTable";
import _ from "lodash";

const Movies = ({ selectedGenre }) => {
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
      try {
        const moviesFromServer = await fetchMovies();
        setMovies(moviesFromServer);
      } catch (ex) {
        console.log(ex);
      }
    };
    getMovies();
  }, [setMovies]);

  //Get Movies
  const fetchMovies = async () => {
    const { data } = await GetMovies();
    return data;
  };

  //Get Movie
  const fetchMovie = async (id) => {
    const { data } = await GetMovie(id);
    return data;
  };

  //Toggle Liked
  const handleToggleLiked = async (id) => {
    const movieToToggle = await fetchMovie(id);
    const like = false;
    let updateMovie = { ...movieToToggle, liked: !like };
    setMovies(
      movies.map((movie) =>
        movie._id === id ? { ...movie, liked: updateMovie.liked } : movie
      )
    );
    try {
      await UpdateLike(id, updateMovie);
    } catch (ex) {
      console.log(ex);
    }
  };

  //Handle Sort
  const handleSort = (sortcolumn) => {
    setSortColumn(sortcolumn);
  };

  //Handle Page Change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //Delete Movie
  const handleDelete = async (id) => {
    setMovies(movies.filter((movie) => movie._id !== id));
    try {
      await DeleteMovie(id);
      toast.success("Movie successfully deleted");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
        setMovies(movies);
      }
    }
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

  const { totalCount, data } = getPageData();
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between mb-4">
        <h3>All Movies</h3>
        <Link to="create-movie/new" className="btn--link">
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
        allmovies={data}
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
